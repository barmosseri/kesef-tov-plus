
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

const DocumentUpload = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">העלאת מסמכים</h1>
        <Card>
          <CardHeader>
            <CardTitle>העלאת מסמכים חדשים</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              כאן תוכל להעלות קבלות, חשבוניות ומסמכים נוספים למערכת. המערכת תנתח את המסמכים באופן אוטומטי ותסווג אותם.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DocumentUpload;
