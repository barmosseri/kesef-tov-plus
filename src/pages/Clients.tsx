
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

const Clients = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">לקוחות וספקים</h1>
        <Card>
          <CardHeader>
            <CardTitle>ניהול לקוחות וספקים</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              כאן תוכל לנהל את רשימת הלקוחות והספקים שלך, לצפות בהיסטוריה, להוסיף לקוחות חדשים ולערוך את הקיימים.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Clients;
