import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Save } from "lucide-react";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const businessTypeOptions = [
  { value: "sole_proprietorship", label: "עוסק מורשה" },
  { value: "registered_partnership", label: "שותפות רשומה" },
  { value: "private_company", label: "חברה פרטית" },
  { value: "non_profit", label: "עמותה/מלכ\"ר" },
];

const vatAdvanceTypeOptions = [
  { value: "monthly", label: "חודשי" },
  { value: "bimonthly", label: "דו-חודשי" },
];

const incomeTaxAdvanceTypeOptions = [
  { value: "monthly", label: "חודשי" },
  { value: "bimonthly", label: "דו-חודשי" },
];

const formSchema = z.object({
  businessName: z.string().min(2, { message: "שם העסק חייב להכיל לפחות 2 תווים" }),
  businessNameEnglish: z.string().min(2, { message: "שם העסק באנגלית חייב להכיל לפחות 2 תווים" }),
  phone: z.string().min(9, { message: "מספר טלפון לא תקין" }),
  registrationNumber: z.string().min(5, { message: "מספר עוסק/ח.פ לא תקין" }),
  businessAddress: z.string().min(5, { message: "כתובת העסק חייבת להכיל לפחות 5 תווים" }),
  businessAddressEnglish: z.string().min(5, { message: "כתובת העסק באנגלית חייבת להכיל לפחות 5 תווים" }),
  email: z.string().email({ message: "כתובת אימייל לא תקינה" }),
  businessType: z.string(),
  incomeTaxAdvancePercentage: z.string(),
  vatAdvanceType: z.string(),
  professionalField: z.string(),
  incomeTaxAdvanceType: z.string(),
  sourceDeductionPercentage: z.string(),
  sourceDeductionExpirationDate: z.date().optional(),
  // Bank account details
  bankName: z.string().optional(),
  bankBranch: z.string().optional(),
  bankAccountNumber: z.string().optional(),
});

type BusinessSettingsFormValues = z.infer<typeof formSchema>;

export function BusinessSettings() {
  const form = useForm<BusinessSettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      businessNameEnglish: "",
      phone: "",
      registrationNumber: "",
      businessAddress: "",
      businessAddressEnglish: "",
      email: "",
      businessType: "sole_proprietorship",
      incomeTaxAdvancePercentage: "",
      vatAdvanceType: "monthly",
      professionalField: "",
      incomeTaxAdvanceType: "monthly",
      sourceDeductionPercentage: "",
    },
  });

  function onSubmit(data: BusinessSettingsFormValues) {
    console.log(data);
    // Here you would typically save the data to your backend
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>הגדרות עסק</CardTitle>
        <CardDescription>הגדר את פרטי העסק הבסיסיים</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">פרטי עסק כלליים</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>שם העסק</FormLabel>
                      <FormControl>
                        <Input placeholder="הזן את שם העסק" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="businessNameEnglish"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>שם העסק באנגלית</FormLabel>
                      <FormControl>
                        <Input placeholder="הזן את שם העסק באנגלית" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
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
                  name="registrationNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>מספר עוסק/ח.פ</FormLabel>
                      <FormControl>
                        <Input placeholder="הזן מספר עוסק או ח.פ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="businessAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>כתובת העסק</FormLabel>
                      <FormControl>
                        <Input placeholder="הזן את כתובת העסק" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="businessAddressEnglish"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>כתובת העסק באנגלית</FormLabel>
                      <FormControl>
                        <Input placeholder="הזן את כתובת העסק באנגלית" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>אימייל</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="הזן כתובת אימייל" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">קטגוריה</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="businessType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>סוג עסק</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="בחר סוג עסק" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {businessTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
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
                  name="incomeTaxAdvancePercentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>אחוז מקדמות מס הכנסה</FormLabel>
                      <FormControl>
                        <Input placeholder="הזן אחוז" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vatAdvanceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>סוג מקדמות מע"מ</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="בחר סוג מקדמות מע"מ" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {vatAdvanceTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
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
                  name="professionalField"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>תחום מקצועי</FormLabel>
                      <FormControl>
                        <Input placeholder="הזן תחום מקצועי" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="incomeTaxAdvanceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>סוג מקדמות מס הכנסה</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="בחר סוג מקדמות מס הכנסה" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {incomeTaxAdvanceTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">ניכוי במקור</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="sourceDeductionPercentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>אחוז ניכוי במקור</FormLabel>
                      <FormControl>
                        <Input placeholder="הזן אחוז ניכוי במקור" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sourceDeductionExpirationDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>תאריך תפוגה</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-right font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy")
                              ) : (
                                <span>בחר תאריך</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date()
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">חשבון בנק</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="bankName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>בנק</FormLabel>
                      <FormControl>
                        <Input placeholder="שם ומספר בנק" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bankBranch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>סניף</FormLabel>
                      <FormControl>
                        <Input placeholder="מספר סניף" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bankAccountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>מספר חשבון</FormLabel>
                      <FormControl>
                        <Input placeholder="מספר חשבון" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

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
