
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { BreadcrumbNav } from '@/components/layout/BreadcrumbNav';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { BarChart2, FileText, Settings, FileUp } from 'lucide-react';

const Reports = () => {
  const breadcrumbItems = [
    { label: "דוחות", href: "/reports", isCurrent: true }
  ];

  return (
    <Layout>
      <div className="space-y-4">
        <BreadcrumbNav items={breadcrumbItems} />
        
        <h1 className="text-2xl font-bold">דוחות</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-keseftov-primary" />
                דוחות פיננסיים
              </CardTitle>
              <CardDescription>מאזנים ודוחות רווח והפסד</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                צפה בדוחות פיננסיים מפורטים כולל דוחות רווח והפסד, מאזנים, ודוחות תזרים מזומנים.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                ספרי חשבונות וגיול
              </CardTitle>
              <CardDescription>דוחות חייבים וזכאים</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                נהל את דוחות החייבים והזכאים, כרטסות, ודוחות גיול עבור ניהול תזרים מזומנים אפקטיבי.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileUp className="h-5 w-5 text-purple-500" />
                דוחות מותאמים אישית
              </CardTitle>
              <CardDescription>יצירה והתאמה של דוחות</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                צור דוחות מותאמים אישית לפי צרכי העסק שלך עם כלי עיצוב דוחות גמיש.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-orange-500" />
                הכנה למס וביקורת
              </CardTitle>
              <CardDescription>דוחות מס והכנה לביקורת</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                דוחות מיוחדים לצורכי מס, כולל דוחות מע״מ, ניכוי במקור, והכנה לביקורת שנתית.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
