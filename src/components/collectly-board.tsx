"use client";

import { useState, useEffect } from "react";
import { Search, Clock, AlertTriangle, Handshake, HelpCircle, Check, Loader2, Plus, X } from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { createClient } from "@/utils/supabase/client";

export function CollectlyBoard() {
  const [data, setData] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  // Add Invoice Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clients, setClients] = useState<any[]>([]);
  const [newInvoice, setNewInvoice] = useState({
    client_id: '',
    invoice_number: '',
    amount: '',
    due_date: '',
    description: '',
    status: 'due_soon',
  });

  // Define base column structure
  const baseColumns = {
    "due_soon": { id: "due_soon", title: "Due Soon", icon: Clock, color: "blue", taskIds: [], desc: "Pre-due heads up (-3d) & due today (0d)" },
    "overdue": { id: "overdue", title: "Overdue", icon: AlertTriangle, color: "rose", taskIds: [], desc: "Polite +3d, firm +7d, +14d escalated" },
    "promised": { id: "promised", title: "Promised to Pay", icon: Handshake, color: "amber", taskIds: [], desc: "Chasing paused until agreed promise date" },
    "disputed": { id: "disputed", title: "Disputed", icon: HelpCircle, color: "purple", taskIds: [], desc: "Sequences halted; owner action required" }
  };

  useEffect(() => {
    setIsMounted(true);
    fetchData();
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const { data } = await supabase.from('clients').select('id, name, company');
    if (data) setClients(data);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      // Fetch invoices with client data attached
      const { data: invoices, error } = await supabase
        .from('invoices')
        .select(`
          *,
          clients (
            name,
            company
          )
        `);

      if (error) throw error;

      const newTasks: any = {};
      
      // Properly clone columns without losing the Icon functions
      const newColumns: any = {
        "due_soon": { ...baseColumns.due_soon, taskIds: [] },
        "overdue": { ...baseColumns.overdue, taskIds: [] },
        "promised": { ...baseColumns.promised, taskIds: [] },
        "disputed": { ...baseColumns.disputed, taskIds: [] }
      };

      if (invoices) {
        invoices.forEach(inv => {
          newTasks[inv.id] = {
            id: inv.id,
            invoiceId: inv.invoice_number,
            clientName: inv.clients?.name || 'Unknown Client',
            agency: inv.clients?.company || 'Unknown Company',
            desc: inv.description || '',
            amount: `$${inv.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}`,
            dueDate: inv.due_date,
            platform: inv.platform || 'STRIPE',
            cadence: inv.cadence || 'N/A'
          };
          
          // Put the task into the correct column based on status
          if (newColumns[inv.status]) {
            newColumns[inv.status].taskIds.push(inv.id);
          }
        });
      }

      setData({
        columns: newColumns,
        tasks: newTasks,
        columnOrder: ["due_soon", "overdue", "promised", "disputed"]
      });
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not logged in");

      const { error } = await supabase
        .from('invoices')
        .insert([{
          user_id: user.id,
          client_id: newInvoice.client_id,
          invoice_number: newInvoice.invoice_number,
          amount: parseFloat(newInvoice.amount),
          due_date: newInvoice.due_date,
          description: newInvoice.description,
          status: newInvoice.status,
          platform: 'STRIPE',
          cadence: '0d'
        }]);

      if (error) throw error;

      setIsAddModalOpen(false);
      setNewInvoice({ client_id: '', invoice_number: '', amount: '', due_date: '', description: '', status: 'due_soon' });
      fetchData(); // Refresh board
      
    } catch (error) {
      console.error("Failed to add invoice", error);
      alert("Failed to add invoice.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = data.columns[source.droppableId];
    const finishColumn = data.columns[destination.droppableId];

    // Optimistic UI Update
    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...startColumn, taskIds: newTaskIds };

      setData((prev: any) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [newColumn.id]: newColumn,
        },
      }));
      return; // Order changes don't need a DB update unless we store order
    }

    // Moving from one list to another
    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = { ...startColumn, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finishColumn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = { ...finishColumn, taskIds: finishTaskIds };

    setData((prev: any) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    }));

    // Perform the real database update in the background
    try {
      const { error } = await supabase
        .from('invoices')
        .update({ status: destination.droppableId })
        .eq('id', draggableId);

      if (error) throw error;
    } catch (err) {
      console.error("Failed to update status in Supabase", err);
    }
  };

  const getBorderColor = (color: string) => {
    const colors: any = { blue: "border-blue-400", rose: "border-rose-500", amber: "border-amber-500", purple: "border-purple-500" };
    return colors[color] || "border-gray-500";
  };

  const getTextColor = (color: string) => {
    const colors: any = { blue: "text-blue-500", rose: "text-rose-500", amber: "text-amber-500", purple: "text-purple-500" };
    return colors[color] || "text-gray-500";
  };

  const getBgColor = (color: string) => {
    const colors: any = { blue: "bg-blue-100 text-blue-700", rose: "bg-rose-100 text-rose-700", amber: "bg-amber-100 text-amber-700", purple: "bg-purple-100 text-purple-700" };
    return colors[color] || "bg-gray-100 text-gray-700";
  };

  return (
    <>
      <div className="flex-1 flex flex-col mt-4 h-full relative z-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <div className="relative w-64">
              <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search client, invoice #..." 
                className="w-full bg-[#0a0a0a]/60 border border-[#222] rounded-full py-1.5 pl-9 pr-4 text-[12px] font-medium text-gray-300 outline-none focus:bg-[#0a0a0a] focus:border-slate-300 transition-all placeholder:text-gray-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-[12px] font-bold text-white border-b-2 border-slate-900 pb-1">All Trades (10)</button>
            <button className="text-[12px] font-bold text-gray-400 pb-1 hover:text-gray-300">Agencies</button>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 text-[12px] font-bold bg-white text-black px-4 py-1.5 rounded-full hover:bg-gray-200 transition-colors ml-4"
            >
              <Plus className="w-3.5 h-3.5" /> Create Invoice
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
          </div>
        )}

        {isMounted && !isLoading && data ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex gap-4 items-stretch h-full pb-4">
              {data.columnOrder.map((columnId: string) => {
                const column = data.columns[columnId];
                const tasks = column.taskIds.map((taskId: string) => data.tasks[taskId]);
                const Icon = column.icon;

                return (
                  <div key={column.id} className="flex flex-col flex-1 glass-card rounded-[24px] overflow-hidden min-h-[400px]">
                    <div className={`p-5 border-t-[3px] ${getBorderColor(column.color)}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-[14px] text-white flex items-center gap-2">
                          <Icon className={`w-4 h-4 ${getTextColor(column.color)}`} /> {column.title}
                        </h3>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${getBgColor(column.color)}`}>{tasks.length}</span>
                      </div>
                      <p className="text-[10px] text-gray-400 font-medium">Total: $0</p>
                      <p className="text-[10px] text-gray-500 font-medium mt-1">{column.desc}</p>
                    </div>
                    
                    <Droppable droppableId={column.id}>
                      {(provided, snapshot) => (
                        <div 
                          ref={provided.innerRef} 
                          {...provided.droppableProps}
                          className={`flex-1 bg-[#111]/50 p-3 flex flex-col gap-3 transition-colors ${snapshot.isDraggingOver ? 'bg-[#1a1a1a]/80' : ''}`}
                        >
                          {tasks.map((task: any, index: number) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`bg-[#0a0a0a] rounded-[20px] p-4 shadow-sm border border-[#1a1a1a] transition-all ${snapshot.isDragging ? 'shadow-lg border-gray-600 scale-105 z-50' : 'hover:border-gray-700'}`}
                                >
                                  <div className="flex justify-between items-start mb-3">
                                    <span className="text-[9px] font-bold text-gray-500">{task.invoiceId}</span>
                                    <span className="text-[9px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded">{task.platform}</span>
                                  </div>
                                  <h4 className="font-bold text-[13px] text-white">{task.clientName}</h4>
                                  <p className="text-[10px] text-gray-400 mb-3">{task.agency}</p>
                                  <p className="text-[11px] font-semibold text-gray-300 mb-4">{task.desc}</p>
                                  
                                  <div className="flex justify-between items-end mb-4">
                                    <span className="text-[15px] font-bold text-white">{task.amount}</span>
                                    <div className="text-right">
                                      <div className="text-[9px] font-semibold text-gray-500">Due {task.dueDate}</div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex justify-between items-center pt-3 border-t border-[#1a1a1a]">
                                    <span className="text-[10px] font-bold text-gray-400">Cadence: {task.cadence}</span>
                                    <div className="flex gap-2">
                                      <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 cursor-pointer"><Check className="w-3 h-3 text-emerald-500" /> Paid</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                          {tasks.length === 0 && (
                            <div className="h-full w-full flex items-center justify-center opacity-50">
                              <span className="text-[12px] font-semibold text-gray-500">No invoices</span>
                            </div>
                          )}
                        </div>
                      )}
                    </Droppable>
                  </div>
                );
              })}
            </div>
          </DragDropContext>
        ) : null}
      </div>

      {/* Add Invoice Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border border-[#222] rounded-[24px] p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white font-serif">Create Invoice</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddInvoice} className="flex flex-col gap-4">
              <div>
                <label className="block text-[12px] font-bold text-gray-400 mb-1.5 ml-1">Select Client</label>
                <select 
                  value={newInvoice.client_id}
                  onChange={(e) => setNewInvoice({...newInvoice, client_id: e.target.value})}
                  className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-3 text-sm text-white font-medium outline-none focus:border-orange-500 transition-all"
                  required
                >
                  <option value="" disabled>Choose a client...</option>
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.company})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-gray-400 mb-1.5 ml-1">Invoice Number</label>
                  <input 
                    type="text" 
                    value={newInvoice.invoice_number}
                    onChange={(e) => setNewInvoice({...newInvoice, invoice_number: e.target.value})}
                    placeholder="INV-1001" 
                    className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-3 text-sm text-white font-medium outline-none focus:border-orange-500 transition-all placeholder:text-gray-700"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-400 mb-1.5 ml-1">Amount ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={newInvoice.amount}
                    onChange={(e) => setNewInvoice({...newInvoice, amount: e.target.value})}
                    placeholder="1500.00" 
                    className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-3 text-sm text-white font-medium outline-none focus:border-orange-500 transition-all placeholder:text-gray-700"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-gray-400 mb-1.5 ml-1">Due Date</label>
                <input 
                  type="date" 
                  value={newInvoice.due_date}
                  onChange={(e) => setNewInvoice({...newInvoice, due_date: e.target.value})}
                  className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-3 text-sm text-white font-medium outline-none focus:border-orange-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-gray-400 mb-1.5 ml-1">Description</label>
                <input 
                  type="text" 
                  value={newInvoice.description}
                  onChange={(e) => setNewInvoice({...newInvoice, description: e.target.value})}
                  placeholder="e.g. Website redesign" 
                  className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-3 text-sm text-white font-medium outline-none focus:border-orange-500 transition-all placeholder:text-gray-700"
                  required
                />
              </div>
              
              <div className="mt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-white text-black font-bold rounded-xl py-3 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Invoice"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
