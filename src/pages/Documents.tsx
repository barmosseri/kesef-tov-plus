
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { BreadcrumbNav } from '@/components/layout/BreadcrumbNav';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { FileText, FileUp, Archive } from 'lucide-react';

const Documents = () => {
  const breadcrumbItems = [
    { label: "מסמכים", href: "/documents", isCurrent: true }
  ];

  return (
    <Layout>
      <div className="space-y-4">
        <BreadcrumbNav items={breadcrumbItems} />
        
        <h1 className="text-2xl font-bold">מסמכים</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-keseftov-primary" />
                יצירת מסמך
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                צור חשבוניות, הצעות מחיר, קבלות ומסמכים אחרים במהירות ובקלות
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileUp className="h-5 w-5 text-blue-500" />
                תבניות
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                צור ונהל תבניות מסמכים מותאמות אישית לשימוש חוזר
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Archive className="h-5 w-5 text-purple-500" />
                ארכיון
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                גש לארכיון המסמכים ההיסטוריים שלך וחפש מסמכים ישנים
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Documents;
