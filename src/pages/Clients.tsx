
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { BreadcrumbNav } from '@/components/ui/breadcrumb';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  Search, 
  Plus, 
  Download, 
  Printer, 
  FileSpreadsheet, 
  MoreHorizontal, 
  Edit, 
  CreditCard, 
  Play, 
  Pause, 
  X, 
  FileText 
} from 'lucide-react';

// Mock data for demonstration
const mockClients = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  status: i % 10 === 0 ? 'suspended' : i % 7 === 0 ? 'canceled' : 'active',
  name: `לקוח ${i + 1}`,
  email: `client${i + 1}@example.com`,
  phone: `05${Math.floor(Math.random() * 10000000) + 10000000}`,
  registrationDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString('he-IL'),
  balance: Math.floor(Math.random() * 10000),
  advances: Math.floor(Math.random() * 5000),
  debt: Math.floor(Math.random() * 3000),
}));

// Mock chart data
const transactionData = [
  { name: 'ינואר', amount: 4000 },
  { name: 'פברואר', amount: 3000 },
  { name: 'מרץ', amount: 2000 },
  { name: 'אפריל', amount: 2780 },
  { name: 'מאי', amount: 1890 },
  { name: 'יוני', amount: 2390 },
];

const advancesData = [
  { name: 'שולם', value: 70 },
  { name: 'ממתין', value: 30 },
];

const debtData = [
  { name: 'פעיל', value: 60 },
  { name: 'באיחור', value: 25 },
  { name: 'בטיפול', value: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [timeFilter, setTimeFilter] = useState('all');
  
  // Filter clients based on search term and status
  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.includes(searchTerm) || 
                         client.email.includes(searchTerm) || 
                         client.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  // Pagination logic
  const totalPages = Math.ceil(filteredClients.length / pageSize);
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  
  const breadcrumbItems = [
    { label: "לקוחות", href: "/clients", isCurrent: true }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <BreadcrumbNav items={breadcrumbItems} />
        
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">ניהול לקוחות</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> לקוח חדש
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>הוספת לקוח חדש</DialogTitle>
                <DialogDescription>
                  הזן את פרטי הלקוח החדש. לחץ על שמור כדי להוסיף את הלקוח למערכת.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Input id="name" className="col-span-4" placeholder="שם הלקוח" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Input id="email" className="col-span-4" placeholder="אימייל" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Input id="phone" className="col-span-4" placeholder="טלפון" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">שמור לקוח</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Tabs defaultValue="table" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="table">טבלת לקוחות</TabsTrigger>
            <TabsTrigger value="analytics">ניתוח נתונים</TabsTrigger>
          </TabsList>
          
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>מחזורי עסקאות</CardTitle>
                  <CardDescription>
                    <Select value={timeFilter} onValueChange={setTimeFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="תקופת זמן" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">כל הזמנים</SelectItem>
                        <SelectItem value="month">חודש אחרון</SelectItem>
                        <SelectItem value="quarter">רבעון אחרון</SelectItem>
                        <SelectItem value="year">שנה אחרונה</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={transactionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="amount" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>מקדמות לקוחות</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={advancesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {advancesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>חובות לקוחות</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={debtData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {debtData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="table" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-6">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="relative w-full md:w-64">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="חיפוש לקוחות..."
                        className="w-full pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="סטטוס" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">הכל</SelectItem>
                        <SelectItem value="active">פעיל</SelectItem>
                        <SelectItem value="suspended">מושהה</SelectItem>
                        <SelectItem value="canceled">מבוטל</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Button variant="outline" size="sm">
                      <FileSpreadsheet className="mr-2 h-4 w-4" /> ייצוא לאקסל
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" /> ייצוא ל-PDF
                    </Button>
                    <Button variant="outline" size="sm">
                      <Printer className="mr-2 h-4 w-4" /> הדפסה
                    </Button>
                  </div>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">סטטוס</TableHead>
                        <TableHead>שם לקוח</TableHead>
                        <TableHead>אימייל</TableHead>
                        <TableHead>טלפון</TableHead>
                        <TableHead>תאריך רישום</TableHead>
                        <TableHead>יתרה</TableHead>
                        <TableHead>מקדמות</TableHead>
                        <TableHead>חובות</TableHead>
                        <TableHead className="text-right">פעולות</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedClients.map((client) => (
                        <TableRow key={client.id}>
                          <TableCell>
                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${client.status === 'active' ? 'bg-green-100 text-green-800' : client.status === 'suspended' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                              {client.status === 'active' ? 'פעיל' : client.status === 'suspended' ? 'מושהה' : 'מבוטל'}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{client.name}</TableCell>
                          <TableCell>{client.email}</TableCell>
                          <TableCell>{client.phone}</TableCell>
                          <TableCell>{client.registrationDate}</TableCell>
                          <TableCell>₪{client.balance.toLocaleString()}</TableCell>
                          <TableCell>₪{client.advances.toLocaleString()}</TableCell>
                          <TableCell>₪{client.debt.toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">פתח תפריט</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" /> עריכה
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <CreditCard className="mr-2 h-4 w-4" /> פרטי כרטיס אשראי
                                </DropdownMenuItem>
                                {client.status === 'active' ? (
                                  <DropdownMenuItem>
                                    <Pause className="mr-2 h-4 w-4" /> השהה
                                  </DropdownMenuItem>
                                ) : client.status === 'suspended' ? (
                                  <DropdownMenuItem>
                                    <Play className="mr-2 h-4 w-4" /> הפעל
                                  </DropdownMenuItem>
                                ) : null}
                                {client.status !== 'canceled' && (
                                  <DropdownMenuItem>
                                    <X className="mr-2 h-4 w-4" /> בטל
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem>
                                  <FileText className="mr-2 h-4 w-4" /> כרטסת לקוח
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="flex items-center justify-between space-x-2 py-4">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <p className="text-sm text-muted-foreground">
                      מציג {paginatedClients.length} מתוך {filteredClients.length} לקוחות
                    </p>
                    <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
                      <SelectTrigger className="w-[70px]">
                        <SelectValue placeholder="10" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="75">75</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                        <SelectItem value="500">500</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <PaginationItem key={pageNum}>
                            <PaginationLink 
                              isActive={currentPage === pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                            >
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}
                      
                      {totalPages > 5 && currentPage < totalPages - 2 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                      
                      {totalPages > 5 && currentPage < totalPages - 2 && (
                        <PaginationItem>
                          <PaginationLink onClick={() => setCurrentPage(totalPages)}>
                            {totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      )}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Clients;
