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
import { Switch } from "@/components/ui/switch";
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
  allowCopies: z.boolean().default(true),
  autoUpdateClientLanguage: z.boolean().default(true),
  autoCheckAmounts: z.boolean().default(true),
});

type DocumentGenerationFormValues = z.infer<typeof formSchema>;

export function DocumentGenerationSettings() {
  const form = useForm<DocumentGenerationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      allowCopies: true,
      autoUpdateClientLanguage: true,
      autoCheckAmounts: true,
    },
  });

  function onSubmit(data: DocumentGenerationFormValues) {
    console.log(data);
    // Here you would typically save the data to your backend
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>הגדרות יצירת מסמכים</CardTitle>
        <CardDescription>הגדר את האפשרויות ליצירת מסמכים במערכת</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">הגדרות כלליות</h3>
              
              <FormField
                control={form.control}
                name="allowCopies"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">יצירת העתקי מסמכים</FormLabel>
                      <FormDescription>
                        אפשר יצירת העתקים של מסמכים (תחת "פעולות נוספות")
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="autoUpdateClientLanguage"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">עדכון שפה אוטומטי</FormLabel>
                      <FormDescription>
                        בחירת לקוח בזמן יצירת מסמך תעדכן אוטומטית את שפת המסמך והמטבע שהוגדרו ללקוח זה
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="autoCheckAmounts"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">סימון סכומים אוטומטי</FormLabel>
                      <FormDescription>
                        מילוי אוטומטי של תיבות סימון עבור סכומים במסמכים שנוצרו באופן ידני
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
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