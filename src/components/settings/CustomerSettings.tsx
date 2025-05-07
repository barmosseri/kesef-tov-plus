import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
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
import { Button } from '@/components/ui/button';
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { 
  Search, 
  Plus, 
  MoreHorizontal,
  BarChart3,
  FileText, 
  Download, 
  Printer, 
  FileSpreadsheet,
  CreditCard,
  Play,
  Pause,
  X,
  Edit,
  Filter,
  ArrowUpDown
} from 'lucide-react';

// Form schema for client creation
const clientFormSchema = z.object({
  // General tab
  fullName: z.string().min(2, { message: "שם חייב להכיל לפחות 2 תווים" }),
  businessNumber: z.string().optional(),
  phoneNumber: z.string().optional(),
  mobileNumber: z.string().min(10, { message: "מספר טלפון נייד לא תקין" }),
  email: z.string().email({ message: "כתובת אימייל לא תקינה" }),
  
  // Address tab
  street: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
  country: z.string().min(1, { message: "יש לבחור מדינה" }),
  
  // Additional Settings tab
  language: z.string().default("he"),
  currency: z.string().default("ILS"),
  website: z.string().optional(),
  accountNumber: z.string().optional(),
  notes: z.string().optional(),
});

type ClientFormValues = z.infer<typeof clientFormSchema>;

// List of countries for dropdown
const countries = [
  { value: "IL", label: "ישראל" },
  { value: "US", label: "ארצות הברית" },
  { value: "GB", label: "בריטניה" },
  { value: "FR", label: "צרפת" },
  { value: "DE", label: "גרמניה" },
  { value: "IT", label: "איטליה" },
  { value: "ES", label: "ספרד" },
  { value: "JP", label: "יפן" },
  { value: "CN", label: "סין" },
  { value: "IN", label: "הודו" },
  { value: "BR", label: "ברזיל" },
  { value: "CA", label: "קנדה" },
  { value: "AU", label: "אוסטרליה" },
  { value: "NZ", label: "ניו זילנד" },
  { value: "KR", label: "דרום קוריאה" },
  { value: "RU", label: "רוסיה" },
];

// List of languages
const languages = [
  { value: "he", label: "עברית" },
  { value: "en", label: "אנגלית" },
];

// List of currencies
const currencies = [
  { value: "ILS", label: "₪ - שקל ישראלי (ILS)" },
  { value: "USD", label: "$ - דולר אמריקאי (USD)" },
  { value: "EUR", label: "€ - אירו (EUR)" },
  { value: "GBP", label: "£ - לירה שטרלינג (GBP)" },
  { value: "JPY", label: "¥ - יין יפני (JPY)" },
  { value: "ALL", label: "L - לק אלבני (ALL)" },
  { value: "CNY", label: "¥ - יואן סיני (CNY)" },
  { value: "INR", label: "₹ - רופי הודי (INR)" },
  { value: "CAD", label: "$ - דולר קנדי (CAD)" },
  { value: "AUD", label: "$ - דולר אוסטרלי (AUD)" },
];

// Mock data for customers
const mockCustomers = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  status: i % 3 === 0 ? 'פעיל' : i % 5 === 0 ? 'מבוטל' : 'מושהה',
  name: `לקוח ${i + 1}`,
  email: i % 2 === 0 ? `client${i+1}@gmail.com` : `omlevy@gmail.com`,
  phone: `05${Math.floor(Math.random() * 100000000)}`,
  date: '16/07/2023',
  balance: (i+1) * 88.00,
}));

// Client creation dialog component
function ClientCreationDialog({ open, onOpenChange, onClientCreated }) {
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      fullName: "",
      businessNumber: "",
      phoneNumber: "",
      mobileNumber: "",
      email: "",
      street: "",
      postalCode: "",
      city: "",
      country: "IL",
      language: "he",
      currency: "ILS",
      website: "",
      accountNumber: "",
      notes: "",
    },
  });

  const onSubmit = (data: ClientFormValues) => {
    console.log('New client data:', data);
    onClientCreated(data);
    form.reset();
  };

  const submitWithCurrentTab = (tabId: string) => {
    // Trigger submit but only validate fields for current tab
    const fieldsToValidate = {
      general: ["fullName", "businessNumber", "phoneNumber", "mobileNumber", "email"],
      address: ["street", "postalCode", "city", "country"],
      additional: ["language", "currency", "website", "accountNumber", "notes"]
    }[tabId];

    form.handleSubmit((data) => {
      console.log(`Submitting from ${tabId} tab`, data);
      onClientCreated(data);
      form.reset();
    }, { focusOnErrors: true })();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>לקוח חדש</DialogTitle>
          <DialogDescription>
            הזן את פרטי הלקוח החדש והגדר את הגדרותיו
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">כללי</TabsTrigger>
                <TabsTrigger value="address">כתובת</TabsTrigger>
                <TabsTrigger value="additional">הגדרות נוספות</TabsTrigger>
              </TabsList>

              {/* General Tab */}
              <TabsContent value="general" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>שם מלא*</FormLabel>
                        <FormControl>
                          <Input placeholder="הזן שם מלא" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="businessNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>מספר עוסק</FormLabel>
                        <FormControl>
                          <Input placeholder="הזן מספר עוסק" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>טלפון</FormLabel>
                        <FormControl>
                          <Input placeholder="הזן מספר טלפון" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mobileNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>טלפון נייד*</FormLabel>
                        <FormControl>
                          <Input placeholder="הזן מספר נייד" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>דוא"ל*</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="הזן כתובת אימייל" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="button" onClick={() => submitWithCurrentTab("general")}>
                    צור לקוח חדש
                  </Button>
                </div>
              </TabsContent>

              {/* Address Tab */}
              <TabsContent value="address" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>רחוב ומספר בית</FormLabel>
                        <FormControl>
                          <Input placeholder="הזן רחוב ומספר בית" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>מיקוד</FormLabel>
                        <FormControl>
                          <Input placeholder="הזן מיקוד" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>עיר</FormLabel>
                        <FormControl>
                          <Input placeholder="הזן עיר" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>מדינה*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="בחר מדינה" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country.value} value={country.value}>
                                {country.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="button" onClick={() => submitWithCurrentTab("address")}>
                    צור לקוח חדש
                  </Button>
                </div>
              </TabsContent>

              {/* Additional Settings Tab */}
              <TabsContent value="additional" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>שפת לקוח</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="בחר שפה" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {languages.map((language) => (
                              <SelectItem key={language.value} value={language.value}>
                                {language.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>מטבע ראשי</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="בחר מטבע" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {currencies.map((currency) => (
                              <SelectItem key={currency.value} value={currency.value}>
                                {currency.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>אתר אינטרנט</FormLabel>
                        <FormControl>
                          <Input placeholder="הזן כתובת אתר" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="accountNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>מספר חשבון בחשבשבת</FormLabel>
                        <FormControl>
                          <Input placeholder="הזן מספר חשבון" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>הערות</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="הזן הערות נוספות לגבי הלקוח"
                            className="resize-none min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="button" onClick={() => submitWithCurrentTab("additional")}>
                    צור לקוח חדש
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function CustomerSettings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [customers, setCustomers] = useState(mockCustomers);
  const [visibleColumns, setVisibleColumns] = useState({
    status: true,
    name: true,
    email: true,
    phone: true,
    date: true,
    balance: true
  });
  
  // Filter customers based on search term and status
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
      customer.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  // Pagination logic
  const totalPages = Math.ceil(filteredCustomers.length / pageSize);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleClientCreated = (clientData) => {
    const newCustomer = {
      id: customers.length + 1,
      status: 'פעיל',
      name: clientData.fullName,
      email: clientData.email,
      phone: clientData.mobileNumber,
      date: new Date().toLocaleDateString('he-IL'),
      balance: 0,
    };
    
    setCustomers([...customers, newCustomer]);
    setIsCreateDialogOpen(false);
  };

  const toggleColumnVisibility = (column) => {
    setVisibleColumns(prev => ({
      ...prev,
      [column]: !prev[column]
    }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>לקוחות</CardTitle>
        <CardDescription>ניהול רשימת הלקוחות במערכת</CardDescription>
      </CardHeader>
      <CardContent>
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
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="סטטוס" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">הכל</SelectItem>
                <SelectItem value="פעיל">פעיל</SelectItem>
                <SelectItem value="מושהה">מושהה</SelectItem>
                <SelectItem value="מבוטל">מבוטל</SelectItem>
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-2">
                  <Filter className="h-4 w-4 mr-2" />
                  סינון עמודות
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>הצג עמודות</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toggleColumnVisibility('status')}>
                  <Checkbox checked={visibleColumns.status} className="mr-2" />
                  סטטוס
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleColumnVisibility('name')}>
                  <Checkbox checked={visibleColumns.name} className="mr-2" />
                  שם לקוח
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleColumnVisibility('email')}>
                  <Checkbox checked={visibleColumns.email} className="mr-2" />
                  כתובת אימייל
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleColumnVisibility('phone')}>
                  <Checkbox checked={visibleColumns.phone} className="mr-2" />
                  טלפון נייד
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleColumnVisibility('date')}>
                  <Checkbox checked={visibleColumns.date} className="mr-2" />
                  תאריך רישום
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleColumnVisibility('balance')}>
                  <Checkbox checked={visibleColumns.balance} className="mr-2" />
                  יתרות
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Button 
              className="bg-keseftov-primary hover:bg-keseftov-primary/90"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> צור לקוח חדש
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" /> ייצא
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <FileSpreadsheet className="mr-2 h-4 w-4" /> ייצוא לאקסל
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" /> ייצוא ל-PDF
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Printer className="mr-2 h-4 w-4" /> הדפסה
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="outline" size="icon">
              <BarChart3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {visibleColumns.status && (
                  <TableHead className="w-[100px]">
                    <Button variant="ghost" className="p-0 h-8 font-medium">
                      סטטוס
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                )}
                {visibleColumns.name && (
                  <TableHead>
                    <Button variant="ghost" className="p-0 h-8 font-medium">
                      שם לקוח
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                )}
                {visibleColumns.phone && (
                  <TableHead>
                    <Button variant="ghost" className="p-0 h-8 font-medium">
                      טלפון נייד
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                )}
                {visibleColumns.date && (
                  <TableHead>
                    <Button variant="ghost" className="p-0 h-8 font-medium">
                      תאריך רישום
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                )}
                {visibleColumns.email && (
                  <TableHead>
                    <Button variant="ghost" className="p-0 h-8 font-medium">
                      כתובת אימייל
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                )}
                {visibleColumns.balance && (
                  <TableHead>
                    <Button variant="ghost" className="p-0 h-8 font-medium">
                      יתרה
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                )}
                <TableHead className="text-right">פעולות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    לא נמצאו לקוחות.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    {visibleColumns.status && (
                      <TableCell>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          customer.status === 'פעיל' 
                            ? 'bg-green-100 text-green-800' 
                            : customer.status === 'מושהה'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {customer.status}
                        </div>
                      </TableCell>
                    )}
                    {visibleColumns.name && (
                      <TableCell className="font-medium">{customer.name}</TableCell>
                    )}
                    {visibleColumns.phone && (
                      <TableCell>{customer.phone}</TableCell>
                    )}
                    {visibleColumns.date && (
                      <TableCell>{customer.date}</TableCell>
                    )}
                    {visibleColumns.email && (
                      <TableCell>{customer.email}</TableCell>
                    )}
                    {visibleColumns.balance && (
                      <TableCell>₪{customer.balance.toFixed(2)}</TableCell>
                    )}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">פתח תפריט</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>פעולות נוספות</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" /> עריכת לקוח
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CreditCard className="mr-2 h-4 w-4" /> פרטי אשראי
                          </DropdownMenuItem>
                          {customer.status === 'פעיל' ? (
                            <DropdownMenuItem>
                              <Pause className="mr-2 h-4 w-4" /> השהה לקוח
                            </DropdownMenuItem>
                          ) : customer.status === 'מושהה' ? (
                            <DropdownMenuItem>
                              <Play className="mr-2 h-4 w-4" /> הפעל לקוח
                            </DropdownMenuItem>
                          ) : null}
                          {customer.status !== 'מבוטל' && (
                            <DropdownMenuItem>
                              <X className="mr-2 h-4 w-4" /> בטל לקוח
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" /> כרטסת לקוח
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <p className="text-sm text-muted-foreground">
              מציג {paginatedCustomers.length} מתוך {filteredCustomers.length} לקוחות
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
                <SelectItem value="200">200</SelectItem>
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

      {/* Client Creation Dialog */}
      <ClientCreationDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
        onClientCreated={handleClientCreated}
      />
    </Card>
  );
}

export default CustomerSettings; 