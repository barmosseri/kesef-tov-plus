
import React from 'react';
import { RevenueChart } from './RevenueChart';
import { RecentTransactions } from './RecentTransactions';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Users, FileText, ArrowUp, ArrowDown } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="space-y-6">
      <header>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">שלום פרטנזון</h1>
          <div className="text-sm text-gray-500">
            התחברות אחרונה להנהח״ש כספת: 30/04/2025
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">סה״כ הכנסות החודש</CardTitle>
            <CreditCard className="h-4 w-4 text-keseftov-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₪94,000</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600 inline-flex items-center">
                <ArrowUp className="me-1 h-3 w-3" />
                20%
              </span>{" "}
              מהחודש הקודם
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">סה״כ הוצאות החודש</CardTitle>
            <CreditCard className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₪59,350</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-red-600 inline-flex items-center">
                <ArrowUp className="me-1 h-3 w-3" />
                12%
              </span>{" "}
              מהחודש הקודם
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">לקוחות פעילים</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600 inline-flex items-center">
                <ArrowUp className="me-1 h-3 w-3" />
                10%
              </span>{" "}
              מהחודש הקודם
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">מסמכים החודש</CardTitle>
            <FileText className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-red-600 inline-flex items-center">
                <ArrowDown className="me-1 h-3 w-3" />
                8%
              </span>{" "}
              מהחודש הקודם
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <RevenueChart year={currentYear} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <RecentTransactions />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">מסמכים פתוחים</h3>
          <div className="text-center py-12 text-gray-500">
            אין מסמכים פתוחים לתצוגה
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">התראות</h3>
          <div className="text-center py-12 text-gray-500">
            אין התראות לתצוגה
          </div>
        </div>
      </div>
    </div>
  );
};
