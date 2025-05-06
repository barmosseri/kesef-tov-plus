
import React from 'react';
import { FileText, CreditCard } from 'lucide-react';

// Sample data - in a real app this would come from API
const recentTransactions = [
  { id: '5617', type: 'קבלה', client: 'אלון פרופיט', amount: 1000.00, date: '29/04/2025', status: 'שולמה במלואה' },
  { id: '5616', type: 'קבלה', client: 'איתי אלנתן', amount: 100.00, date: '30/04/2025', status: 'שולמה במלואה' },
  { id: '5615', type: 'קבלה', client: 'ג׳י.אל סטודיו בע״מ', amount: 100.00, date: '28/04/2025', status: 'שולמה במלואה' },
  { id: '5614', type: 'קבלה', client: 'נורית פוקו', amount: 100.00, date: '28/04/2025', status: 'שולמה במלואה' },
  { id: '5612', type: 'קבלה', client: 'זווטקה', amount: -13000.00, date: '22/04/2025', status: 'שולמה במלואה' },
];

export const RecentTransactions: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">מסמכים אחרונים</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-right">
              <th className="pb-3 font-medium text-gray-500">#</th>
              <th className="pb-3 font-medium text-gray-500">סוג</th>
              <th className="pb-3 font-medium text-gray-500">לקוח/ספק</th>
              <th className="pb-3 font-medium text-gray-500">סכום</th>
              <th className="pb-3 font-medium text-gray-500">תאריך</th>
              <th className="pb-3 font-medium text-gray-500">סטטוס</th>
              <th className="pb-3 font-medium text-gray-500">פעולות</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map((transaction) => (
              <tr key={transaction.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="py-3 text-gray-800">{transaction.id}</td>
                <td className="py-3 text-gray-800">{transaction.type}</td>
                <td className="py-3 text-gray-800">{transaction.client}</td>
                <td className={`py-3 ${transaction.amount < 0 ? 'text-red-600' : 'text-gray-800'}`}>
                  ₪{transaction.amount.toLocaleString('he-IL')}
                </td>
                <td className="py-3 text-gray-800">{transaction.date}</td>
                <td className="py-3">
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    {transaction.status}
                  </span>
                </td>
                <td className="py-3">
                  <div className="flex space-s-2">
                    <button className="text-gray-500 hover:text-keseftov-primary">
                      <FileText size={18} />
                    </button>
                    <button className="text-gray-500 hover:text-keseftov-primary">
                      <CreditCard size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center">
        <button className="text-keseftov-primary hover:text-keseftov-secondary text-sm">
          הצג הכל
        </button>
      </div>
    </div>
  );
};
