
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
import { Briefcase, Globe, Users, Link } from 'lucide-react';

const Settings = () => {
  const breadcrumbItems = [
    { label: "הגדרות מערכת", href: "/settings", isCurrent: true }
  ];

  return (
    <Layout>
      <div className="space-y-4">
        <BreadcrumbNav items={breadcrumbItems} />
        
        <h1 className="text-2xl font-bold">הגדרות מערכת</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-keseftov-primary" />
                פרופיל חברה
              </CardTitle>
              <CardDescription>פרטי העסק ולוגו</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                נהל את פרטי העסק שלך, כולל שם העסק, מספר עוסק, לוגו ופרטי קשר שיופיעו על גבי מסמכים.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-500" />
                לוקליזציה ומטבע
              </CardTitle>
              <CardDescription>אזור זמן, שפה ומטבע</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                הגדר את אזור הזמן, שפה, פורמט תאריכים וסוג המטבע לפי הצרכים המקומיים של העסק.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-500" />
                משתמשים ואבטחה
              </CardTitle>
              <CardDescription>ניהול משתמשים והרשאות</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                נהל משתמשים, הרשאות גישה, והגדרות אבטחה לשמירה על נתוני העסק שלך.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="h-5 w-5 text-orange-500" />
                אינטגרציות
              </CardTitle>
              <CardDescription>חיבור למערכות חיצוניות</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                חבר את המערכת לשירותים חיצוניים כגון בנקים, מערכות סליקה, שירותי דואר אלקטרוני ועוד.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
