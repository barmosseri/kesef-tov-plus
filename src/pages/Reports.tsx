
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

const Reports = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">דוחות</h1>
        <Card>
          <CardHeader>
            <CardTitle>דוחות פיננסיים</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              כאן תוכל לצפות בדוחות מפורטים על פעילות העסק, כולל דוחות רווח והפסד, מאזנים, דוחות מע"מ, וניתוחי מכירות.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Reports;
