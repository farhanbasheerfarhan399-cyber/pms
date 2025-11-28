import React, { useState } from 'react';
import { 
  DollarSign, TrendingUp, TrendingDown, Users, Search, Filter, 
  Download, Plus, LucideIcon, X 
} from 'lucide-react';

// --- Types ---
interface Stat {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
}

interface RentPayment {
  id: number;
  tenant: string;
  unit: string;
  leaseAmount: number;
  paidAmount: number;
  pendingAmount: number;
  status: 'Paid' | 'Partial' | 'Pending';
  date: string;
}

interface MaintenanceTransfer {
  id: number;
  worker: string;
  issue: string;
  amount: number;
  status: 'Completed' | 'In Progress' | 'Pending';
  date: string;
}

interface MaintenanceReceipt {
  id: number;
  tenant: string;
  unit: string;
  issue: string;
  amount: number;
  status: 'Received' | 'Pending';
  date: string;
}

type TabType = 'overview' | 'rent' | 'transfers' | 'receipts';

interface DialogState {
  recordPayment: boolean;
  newTransfer: boolean;
  recordReceipt: boolean;
}

// --- Reusable "Shadcn-like" Components ---

const ShadcnDialog = ({ 
  isOpen, 
  onClose, 
  title, 
  description, 
  children, 
  footer 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  description?: string;
  children: React.ReactNode; 
  footer?: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-200 bg-white p-6 shadow-lg duration-200 sm:rounded-lg">
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2 className="text-lg font-semibold leading-none tracking-tight text-slate-950">{title}</h2>
          {description && <p className="text-sm text-slate-500">{description}</p>}
        </div>
        <div className="py-2">
          {children}
        </div>
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        {footer && (
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

const ShadcnLabel = ({ children }: { children: React.ReactNode }) => (
  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
    {children}
  </label>
);

const ShadcnInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input 
    {...props}
    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
  />
);

const ShadcnTextArea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea 
      {...props}
      className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    />
);

const ShadcnButton = ({ 
  variant = 'default', 
  className = '', 
  children, 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2";
  const variants = {
    default: "bg-slate-900 text-slate-50 hover:bg-slate-900/90",
    outline: "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 text-slate-900"
  };
  
  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- Main Component ---

export default function AccountManagement() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dialogs, setDialogs] = useState<DialogState>({
    recordPayment: false,
    newTransfer: false,
    recordReceipt: false,
  });

  // --- DATA STATES (Now using useState so we can update them) ---
  const [stats] = useState<Stat[]>([
    { label: 'Total Rent Collected', value: '$45,680', change: '+12.5%', trend: 'up', icon: TrendingUp },
    { label: 'Pending Payments', value: '$8,450', change: '-5.2%', trend: 'down', icon: TrendingDown },
    { label: 'Maintenance Fund', value: '$12,340', change: '+8.1%', trend: 'up', icon: DollarSign },
    { label: 'Active Tenants', value: '24', change: '+2', trend: 'up', icon: Users },
  ]);

  const [rentPayments, setRentPayments] = useState<RentPayment[]>([
    { id: 1, tenant: 'John Smith', unit: 'A-101', leaseAmount: 1500, paidAmount: 1500, pendingAmount: 0, status: 'Paid', date: '2024-11-01' },
    { id: 2, tenant: 'Sarah Johnson', unit: 'B-205', leaseAmount: 1800, paidAmount: 1200, pendingAmount: 600, status: 'Partial', date: '2024-11-03' },
  ]);

  const [maintenanceTransfers, setMaintenanceTransfers] = useState<MaintenanceTransfer[]>([
    { id: 1, worker: 'ABC Plumbing', issue: 'Pipe Repair - Unit A-101', amount: 450, status: 'Completed', date: '2024-11-15' },
    { id: 2, worker: 'Elite Electricians', issue: 'Wiring Fix - Unit B-205', amount: 320, status: 'Completed', date: '2024-11-14' },
  ]);

  const [maintenanceReceipts, setMaintenanceReceipts] = useState<MaintenanceReceipt[]>([
    { id: 1, tenant: 'John Smith', unit: 'A-101', issue: 'Broken Faucet', amount: 150, status: 'Received', date: '2024-11-10' },
  ]);

  // --- FORM STATES (To hold input data) ---
  const [paymentForm, setPaymentForm] = useState({ tenant: '', unit: '', amount: '', date: '' });
  const [transferForm, setTransferForm] = useState({ worker: '', issue: '', amount: '', status: 'Pending' });
  const [receiptForm, setReceiptForm] = useState({ tenant: '', unit: '', issue: '', amount: '', date: '' });

  // --- HANDLERS ---

  const openDialog = (dialogName: keyof DialogState) => {
    setDialogs({ ...dialogs, [dialogName]: true });
  };

  const closeDialog = (dialogName: keyof DialogState) => {
    setDialogs({ ...dialogs, [dialogName]: false });
  };

  const handleSavePayment = () => {
    const newPayment: RentPayment = {
      id: Date.now(),
      tenant: paymentForm.tenant,
      unit: paymentForm.unit,
      leaseAmount: Number(paymentForm.amount), // Assuming full payment for simplicity
      paidAmount: Number(paymentForm.amount),
      pendingAmount: 0,
      status: 'Paid',
      date: paymentForm.date || new Date().toISOString().split('T')[0]
    };
    setRentPayments([newPayment, ...rentPayments]);
    setPaymentForm({ tenant: '', unit: '', amount: '', date: '' }); // Reset form
    closeDialog('recordPayment');
  };

  const handleSaveTransfer = () => {
    const newTransfer: MaintenanceTransfer = {
      id: Date.now(),
      worker: transferForm.worker,
      issue: transferForm.issue,
      amount: Number(transferForm.amount),
      status: transferForm.status as 'Pending' | 'Completed' | 'In Progress',
      date: new Date().toISOString().split('T')[0]
    };
    setMaintenanceTransfers([newTransfer, ...maintenanceTransfers]);
    setTransferForm({ worker: '', issue: '', amount: '', status: 'Pending' });
    closeDialog('newTransfer');
  };

  const handleSaveReceipt = () => {
    const newReceipt: MaintenanceReceipt = {
      id: Date.now(),
      tenant: receiptForm.tenant,
      unit: receiptForm.unit,
      issue: receiptForm.issue,
      amount: Number(receiptForm.amount),
      status: 'Received',
      date: receiptForm.date || new Date().toISOString().split('T')[0]
    };
    setMaintenanceReceipts([newReceipt, ...maintenanceReceipts]);
    setReceiptForm({ tenant: '', unit: '', issue: '', amount: '', date: '' });
    closeDialog('recordReceipt');
  };

  const exportReport = () => {
    const reportData = { stats, rentPayments, maintenanceTransfers, maintenanceReceipts, date: new Date().toISOString() };
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `account-report.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Page Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Accounts</h1>
        <p className="text-gray-600 mt-1">Manage all financial transactions and payments</p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="flex space-x-2 border-b border-gray-200">
          {(['overview', 'rent', 'transfers', 'receipts'] as TabType[]).map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium transition capitalize ${
                activeTab === tab 
                  ? 'text-slate-900 border-b-2 border-slate-900' 
                  : 'text-gray-500 hover:text-slate-900'
              }`}
            >
              {tab === 'rent' ? 'Rent Payments' : tab === 'transfers' ? 'Fund Transfers' : tab === 'receipts' ? 'Maintenance Receipts' : 'Overview'}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="w-8 h-8 text-slate-700" />
                  <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button onClick={() => openDialog('recordPayment')} className="flex items-center justify-center space-x-2 bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition">
                <Plus className="w-5 h-5" />
                <span>Record Payment</span>
              </button>
              <button onClick={() => openDialog('newTransfer')} className="flex items-center justify-center space-x-2 border border-slate-200 text-slate-900 px-6 py-3 rounded-lg hover:bg-slate-50 transition">
                <Plus className="w-5 h-5" />
                <span>New Transfer</span>
              </button>
              <button onClick={exportReport} className="flex items-center justify-center space-x-2 border border-slate-200 text-slate-900 px-6 py-3 rounded-lg hover:bg-slate-50 transition">
                <Download className="w-5 h-5" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Rent Payments Tab */}
      {activeTab === 'rent' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-900">Rent Payment Details</h3>
            <ShadcnButton onClick={() => openDialog('recordPayment')}>
              <Plus className="w-4 h-4 mr-2" /> Record Payment
            </ShadcnButton>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <ShadcnInput placeholder="Search by tenant..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <ShadcnButton variant="outline"><Filter className="w-4 h-4 mr-2" /> Filter</ShadcnButton>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    {['Tenant', 'Unit', 'Lease', 'Paid', 'Pending', 'Status', 'Date'].map(h => (
                      <th key={h} className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {rentPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{payment.tenant}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{payment.unit}</td>
                      <td className="px-6 py-4 text-sm text-slate-900">${payment.leaseAmount}</td>
                      <td className="px-6 py-4 text-sm text-green-600 font-medium">${payment.paidAmount}</td>
                      <td className="px-6 py-4 text-sm text-red-600 font-medium">${payment.pendingAmount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                          payment.status === 'Paid' ? 'bg-green-100 text-green-800' :
                          payment.status === 'Partial' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                        }`}>{payment.status}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{payment.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Transfers Tab */}
      {activeTab === 'transfers' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
           <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-900">Transfers</h3>
            <ShadcnButton onClick={() => openDialog('newTransfer')}>
              <Plus className="w-4 h-4 mr-2" /> New Transfer
            </ShadcnButton>
          </div>
          <div className="p-6 overflow-x-auto">
            <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    {['Worker', 'Issue', 'Amount', 'Status', 'Date'].map(h => (
                      <th key={h} className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {maintenanceTransfers.map((transfer) => (
                    <tr key={transfer.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{transfer.worker}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{transfer.issue}</td>
                      <td className="px-6 py-4 text-sm text-slate-900">${transfer.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                          transfer.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>{transfer.status}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{transfer.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
        </div>
      )}

      {/* Receipts Tab */}
      {activeTab === 'receipts' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
           <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-900">Receipts</h3>
            <ShadcnButton onClick={() => openDialog('recordReceipt')}>
              <Plus className="w-4 h-4 mr-2" /> Record Receipt
            </ShadcnButton>
          </div>
          <div className="p-6 overflow-x-auto">
             <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    {['Tenant', 'Unit', 'Issue', 'Amount', 'Status', 'Date'].map(h => (
                      <th key={h} className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {maintenanceReceipts.map((receipt) => (
                    <tr key={receipt.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{receipt.tenant}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{receipt.unit}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{receipt.issue}</td>
                      <td className="px-6 py-4 text-sm text-green-600 font-medium">+${receipt.amount}</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {receipt.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{receipt.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
        </div>
      )}

      {/* --- DIALOGS --- */}

      <ShadcnDialog 
        isOpen={dialogs.recordPayment} 
        onClose={() => closeDialog('recordPayment')}
        title="Record Rent Payment"
        description="Enter the payment details for the tenant."
        footer={
          <>
            <ShadcnButton variant="outline" onClick={() => closeDialog('recordPayment')}>Cancel</ShadcnButton>
            <ShadcnButton onClick={handleSavePayment}>Save Payment</ShadcnButton>
          </>
        }
      >
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <ShadcnLabel>Tenant</ShadcnLabel>
            <div className="col-span-3">
              <ShadcnInput 
                placeholder="John Doe" 
                value={paymentForm.tenant}
                onChange={(e) => setPaymentForm({...paymentForm, tenant: e.target.value})}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <ShadcnLabel>Unit</ShadcnLabel>
            <div className="col-span-3">
              <ShadcnInput 
                placeholder="A-101" 
                value={paymentForm.unit}
                onChange={(e) => setPaymentForm({...paymentForm, unit: e.target.value})}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <ShadcnLabel>Amount</ShadcnLabel>
            <div className="col-span-3">
              <ShadcnInput 
                type="number" 
                placeholder="0.00" 
                value={paymentForm.amount}
                onChange={(e) => setPaymentForm({...paymentForm, amount: e.target.value})}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <ShadcnLabel>Date</ShadcnLabel>
            <div className="col-span-3">
              <ShadcnInput 
                type="date"
                value={paymentForm.date}
                onChange={(e) => setPaymentForm({...paymentForm, date: e.target.value})}
              />
            </div>
          </div>
        </div>
      </ShadcnDialog>

      <ShadcnDialog 
        isOpen={dialogs.newTransfer} 
        onClose={() => closeDialog('newTransfer')}
        title="New Fund Transfer"
        description="Create a transfer to a maintenance worker or vendor."
        footer={
          <>
            <ShadcnButton variant="outline" onClick={() => closeDialog('newTransfer')}>Cancel</ShadcnButton>
            <ShadcnButton onClick={handleSaveTransfer}>Create Transfer</ShadcnButton>
          </>
        }
      >
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <ShadcnLabel>Worker</ShadcnLabel>
            <div className="col-span-3">
              <ShadcnInput 
                placeholder="Company or Name" 
                value={transferForm.worker}
                onChange={(e) => setTransferForm({...transferForm, worker: e.target.value})}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <ShadcnLabel>Issue</ShadcnLabel>
            <div className="col-span-3">
              <ShadcnTextArea 
                placeholder="Describe the issue..." 
                value={transferForm.issue}
                onChange={(e) => setTransferForm({...transferForm, issue: e.target.value})}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <ShadcnLabel>Amount</ShadcnLabel>
            <div className="col-span-3">
              <ShadcnInput 
                type="number" 
                placeholder="0.00" 
                value={transferForm.amount}
                onChange={(e) => setTransferForm({...transferForm, amount: e.target.value})}
              />
            </div>
          </div>
        </div>
      </ShadcnDialog>

      <ShadcnDialog 
        isOpen={dialogs.recordReceipt} 
        onClose={() => closeDialog('recordReceipt')}
        title="Record Maintenance Receipt"
        description="Log funds received from tenants for repairs."
        footer={
          <>
            <ShadcnButton variant="outline" onClick={() => closeDialog('recordReceipt')}>Cancel</ShadcnButton>
            <ShadcnButton onClick={handleSaveReceipt}>Save Receipt</ShadcnButton>
          </>
        }
      >
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <ShadcnLabel>Tenant</ShadcnLabel>
            <div className="col-span-3">
              <ShadcnInput 
                placeholder="Name" 
                value={receiptForm.tenant}
                onChange={(e) => setReceiptForm({...receiptForm, tenant: e.target.value})}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <ShadcnLabel>Unit</ShadcnLabel>
            <div className="col-span-3">
              <ShadcnInput 
                placeholder="Unit Number" 
                value={receiptForm.unit}
                onChange={(e) => setReceiptForm({...receiptForm, unit: e.target.value})}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <ShadcnLabel>Issue</ShadcnLabel>
            <div className="col-span-3">
              <ShadcnInput 
                placeholder="Broken Window, etc." 
                value={receiptForm.issue}
                onChange={(e) => setReceiptForm({...receiptForm, issue: e.target.value})}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <ShadcnLabel>Amount</ShadcnLabel>
            <div className="col-span-3">
              <ShadcnInput 
                type="number" 
                placeholder="0.00" 
                value={receiptForm.amount}
                onChange={(e) => setReceiptForm({...receiptForm, amount: e.target.value})}
              />
            </div>
          </div>
        </div>
      </ShadcnDialog>

    </div>
  );
}