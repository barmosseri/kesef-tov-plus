
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

const Settings = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">הגדרות מערכת</h1>
        <Card>
          <CardHeader>
            <CardTitle>הגדרות כלליות</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              כאן תוכל לנהל את הגדרות העסק שלך, כולל פרטי העסק, הגדרות מיסים, מטבע, ואפשרויות נוספות.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;
