import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { BreadcrumbNav } from '@/components/layout/BreadcrumbNav';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { 
  Briefcase, 
  Globe, 
  Users, 
  Link as LinkIcon, 
  UserCircle, 
  FileText, 
  Settings as SettingsIcon, 
  FileSpreadsheet, 
  Printer 
} from 'lucide-react';
import { CustomerSettings } from '@/components/settings/CustomerSettings';
import { BusinessSettings } from '@/components/settings/BusinessSettings';
import { DocumentSettings } from '@/components/settings/DocumentSettings';
import { DocumentGenerationSettings } from '@/components/settings/DocumentGenerationSettings';
import { UserSettings } from '@/components/settings/UserSettings';
import { TaxReportSettings } from '@/components/settings/TaxReportSettings';

const Settings = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  const breadcrumbItems = [
    { label: "הגדרות מערכת", href: "/settings", isCurrent: true }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'business':
        return <BusinessSettings />;
      case 'documents':
        return <DocumentSettings />;
      case 'doc-generation':
        return <DocumentGenerationSettings />;
      case 'customers':
        return <CustomerSettings />;
      case 'users':
        return <UserSettings />;
      case 'tax-report':
        return <TaxReportSettings />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => setActiveSection('business')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-keseftov-primary" />
                  פרטי עסק
                </CardTitle>
                <CardDescription>פרטי העסק הבסיסיים</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  הגדר את פרטי העסק הבסיסיים כגון שם, כתובת, טלפון, מספר עוסק ופרטי קשר
                </p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => setActiveSection('documents')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  מסמכים
                </CardTitle>
                <CardDescription>הגדרות לוגו ומספור מסמכים</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  העלה לוגו לעסק שלך והגדר מספור התחלתי לכל סוגי המסמכים במערכת
                </p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => setActiveSection('doc-generation')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Printer className="h-5 w-5 text-purple-500" />
                  הפקת מסמכים
                </CardTitle>
                <CardDescription>הגדרות להתנהגות בזמן יצירת מסמכים</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  קבע אפשרויות וברירות מחדל עבור יצירת והפקת מסמכים חדשים
                </p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => setActiveSection('customers')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCircle className="h-5 w-5 text-green-500" />
                  לקוחות
                </CardTitle>
                <CardDescription>ניהול לקוחות</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  נהל את רשימת הלקוחות שלך, צפה בפרטי לקוחות ועדכן את המידע שלהם במקום אחד
                </p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => setActiveSection('users')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-orange-500" />
                  משתמשים
                </CardTitle>
                <CardDescription>ניהול משתמשים והרשאות</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  הוסף ונהל משתמשים נוספים לפרופיל העסקי שלך עם הרשאות שונות
                </p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => setActiveSection('tax-report')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSpreadsheet className="h-5 w-5 text-red-500" />
                  נתוני דוח מס
                </CardTitle>
                <CardDescription>נתוני ניכויים ותשלומים להגשה</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  הגדר נתוני פחת, קרן השתלמות, פנסיה, ביטוח לאומי ונתוני מס אחרים
                </p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <BreadcrumbNav items={breadcrumbItems} />
          {activeSection && (
            <button 
              onClick={() => setActiveSection(null)}
              className="text-sm text-muted-foreground hover:text-primary"
            >
              חזרה להגדרות
            </button>
          )}
        </div>
        
        <h1 className="text-2xl font-bold">הגדרות מערכת</h1>
        
        {renderContent()}
      </div>
    </Layout>
  );
};

export default Settings;
