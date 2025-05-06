
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

const Documents = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">מסמכים</h1>
        <Card>
          <CardHeader>
            <CardTitle>ניהול מסמכים</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              כאן תוכל לנהל את כל המסמכים העסקיים שלך, כולל חשבוניות, הצעות מחיר, קבלות ומסמכים נוספים.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Documents;
