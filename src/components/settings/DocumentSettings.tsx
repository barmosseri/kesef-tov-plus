import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Save, Upload, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formSchema = z.object({
  // Document numbering settings
  quoteNumbering: z.string().regex(/^\d+$/, { message: "יש להזין מספר התחלתי חוקי" }),
  workOrderNumbering: z.string().regex(/^\d+$/, { message: "יש להזין מספר התחלתי חוקי" }),
  invoiceNumbering: z.string().regex(/^\d+$/, { message: "יש להזין מספר התחלתי חוקי" }),
  returnCertificateNumbering: z.string().regex(/^\d+$/, { message: "יש להזין מספר התחלתי חוקי" }),
  deliveryCertificateNumbering: z.string().regex(/^\d+$/, { message: "יש להזין מספר התחלתי חוקי" }),
  receiptNumbering: z.string().regex(/^\d+$/, { message: "יש להזין מספר התחלתי חוקי" }),
});

type DocumentSettingsFormValues = z.infer<typeof formSchema>;

export function DocumentSettings() {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const form = useForm<DocumentSettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quoteNumbering: "1000",
      workOrderNumbering: "1000",
      invoiceNumbering: "1000",
      returnCertificateNumbering: "1000",
      deliveryCertificateNumbering: "1000",
      receiptNumbering: "1000",
    },
  });

  function onSubmit(data: DocumentSettingsFormValues) {
    console.log(data, logoFile);
    // Here you would typically save the data and logo to your backend
  }

  function handleLogoUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setLogoFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  function removeLogo() {
    setLogoFile(null);
    setLogoPreview(null);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>הגדרות מסמכים</CardTitle>
        <CardDescription>לוגו ומספור מסמכים</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="logo" className="w-full">
          <TabsList>
            <TabsTrigger value="logo">לוגו</TabsTrigger>
            <TabsTrigger value="numbering">מספור מסמכים</TabsTrigger>
          </TabsList>

          <TabsContent value="logo" className="mt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">לוגו העסק</h3>
              <p className="text-sm text-muted-foreground">
                העלה את לוגו העסק שלך. הלוגו יופיע בכל המסמכים שתפיק מהמערכת.
              </p>

              <div className="flex flex-col items-center space-y-4">
                {logoPreview ? (
                  <div className="relative">
                    <img 
                      src={logoPreview} 
                      alt="לוגו העסק" 
                      className="w-64 h-64 object-contain border rounded-md p-2" 
                    />
                    <Button 
                      variant="destructive" 
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={removeLogo}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ) : (
                  <div className="w-64 h-64 border border-dashed rounded-md flex flex-col items-center justify-center p-4">
                    <Upload size={48} className="text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground text-center">
                      לחץ על כפתור "העלה לוגו" להעלאת לוגו
                    </p>
                  </div>
                )}

                <div className="flex gap-2">
                  <label className="cursor-pointer">
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoUpload}
                    />
                    <Button type="button" variant="outline" asChild>
                      <span>
                        <Upload className="mr-2 h-4 w-4" />
                        העלה לוגו
                      </span>
                    </Button>
                  </label>
                  {logoPreview && (
                    <Button 
                      type="button" 
                      variant="destructive"
                      onClick={removeLogo}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      הסר לוגו
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="numbering" className="mt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">מספור מסמכים</h3>
                  <p className="text-sm text-muted-foreground">
                    הגדר את המספר ההתחלתי לכל סוג מסמך. מספרי המסמכים יגדלו אוטומטית עם כל מסמך חדש.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="quoteNumbering"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>הצעת מחיר</FormLabel>
                          <FormControl>
                            <Input placeholder="מספר התחלתי" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="workOrderNumbering"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>הזמנת עבודה</FormLabel>
                          <FormControl>
                            <Input placeholder="מספר התחלתי" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="invoiceNumbering"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>חשבונית עסקה</FormLabel>
                          <FormControl>
                            <Input placeholder="מספר התחלתי" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="returnCertificateNumbering"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>תעודת החזרה</FormLabel>
                          <FormControl>
                            <Input placeholder="מספר התחלתי" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="deliveryCertificateNumbering"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>תעודת משלוח</FormLabel>
                          <FormControl>
                            <Input placeholder="מספר התחלתי" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="receiptNumbering"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>קבלה</FormLabel>
                          <FormControl>
                            <Input placeholder="מספר התחלתי" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    שמור הגדרות
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 