
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

const Finance = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">ניהול פיננסי</h1>
        <Card>
          <CardHeader>
            <CardTitle>מעקב פיננסי</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              כאן תוכל לנהל את ההכנסות וההוצאות השוטפות שלך, לעקוב אחר תשלומים לספקים, ולנהל את התזרים הכספי של העסק.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Finance;
