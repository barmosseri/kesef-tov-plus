import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Save } from "lucide-react";

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

const formSchema = z.object({
  depreciation: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "יש להזין מספר תקין" }),
  creditPoints: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "יש להזין מספר תקין" }),
  annualGrossSalary: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "יש להזין מספר תקין" }),
  trainingFundContribution: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "יש להזין מספר תקין" }),
  nationalInsurance: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "יש להזין מספר תקין" }),
  annualIncomeTax: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "יש להזין מספר תקין" }),
  pensionFundContribution: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "יש להזין מספר תקין" }),
});

type TaxReportFormValues = z.infer<typeof formSchema>;

export function TaxReportSettings() {
  const form = useForm<TaxReportFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      depreciation: "0",
      creditPoints: "0",
      annualGrossSalary: "0",
      trainingFundContribution: "0",
      nationalInsurance: "0",
      annualIncomeTax: "0",
      pensionFundContribution: "0",
    },
  });

  function onSubmit(data: TaxReportFormValues) {
    console.log(data);
    // Here you would typically save the data to your backend
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>נתוני דוח מס</CardTitle>
        <CardDescription>הגדר את הנתונים הפיננסיים שישמשו בדוחות המס</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">נתוני ניכויים ותשלומים</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="depreciation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>פחת</FormLabel>
                      <FormControl>
                        <Input placeholder="הזן סכום" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="creditPoints"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>נקודות זיכוי</FormLabel>
                      <FormControl>
                        <Input placeholder="הזן מספר" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="annualGrossSalary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>משכורת ברוטו שנתית</FormLabel>
                      <FormControl>
                        <Input placeholder="הזן סכום" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="trainingFundContribution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>הפרשה לקרן השתלמות</FormLabel>
                      <FormControl>
                        <Input placeholder="הזן סכום" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="nationalInsurance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ביטוח לאומי</FormLabel>
                      <FormControl>
                        <Input placeholder="הזן סכום" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="annualIncomeTax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>מס הכנסה שנתי</FormLabel>
                      <FormControl>
                        <Input placeholder="הזן סכום" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="pensionFundContribution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>הפרשה לקרן פנסיה</FormLabel>
                      <FormControl>
                        <Input placeholder="הזן סכום" {...field} />
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
      </CardContent>
    </Card>
  );
} 