import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Save, Plus, User, Mail, Phone, X } from "lucide-react";

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
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const userRoles = [
  { value: "admin", label: "מנהל" },
  { value: "manager", label: "מנהל תוכן" },
  { value: "accountant", label: "חשב" },
  { value: "viewer", label: "צפייה בלבד" },
];

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  isActive: boolean;
}

const newUserFormSchema = z.object({
  name: z.string().min(2, { message: "שם המשתמש חייב להכיל לפחות 2 תווים" }),
  email: z.string().email({ message: "כתובת אימייל לא תקינה" }),
  phone: z.string().min(9, { message: "מספר טלפון לא תקין" }),
  role: z.string({ required_error: "נא לבחור תפקיד" }),
});

type NewUserFormValues = z.infer<typeof newUserFormSchema>;

export function UserSettings() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "משתמש ראשי",
      email: "admin@example.com",
      phone: "050-1234567",
      role: "admin",
      isActive: true,
    },
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMultiUserEnabled, setIsMultiUserEnabled] = useState(true);

  const form = useForm<NewUserFormValues>({
    resolver: zodResolver(newUserFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "",
    },
  });

  function onSubmit(data: NewUserFormValues) {
    // Add new user
    const newUser: User = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      isActive: true,
    };
    
    setUsers([...users, newUser]);
    setIsDialogOpen(false);
    form.reset();
  }

  function toggleUserStatus(userId: string) {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, isActive: !user.isActive } : user
      )
    );
  }

  function removeUser(userId: string) {
    setUsers(users.filter((user) => user.id !== userId));
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>הגדרות משתמשים</CardTitle>
        <CardDescription>ניהול חשבונות משתמשים במערכת</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel className="text-base">משתמשים מרובים</FormLabel>
            <FormDescription>
              אפשר להוסיף משתמשים נוספים לפרופיל העסקי שלי מלבד זה הנוכחי
            </FormDescription>
          </div>
          <Switch
            checked={isMultiUserEnabled}
            onCheckedChange={setIsMultiUserEnabled}
          />
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">משתמשים ({users.length})</h3>
            {isMultiUserEnabled && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    הוסף משתמש
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>הוספת משתמש חדש</DialogTitle>
                    <DialogDescription>
                      הזן את פרטי המשתמש החדש ובחר את רמת ההרשאה שלו.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>שם מלא</FormLabel>
                            <FormControl>
                              <Input placeholder="הזן שם מלא" {...field} />
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
                              <Input placeholder="הזן כתובת אימייל" {...field} />
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
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>תפקיד</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="בחר תפקיד" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {userRoles.map((role) => (
                                  <SelectItem key={role.value} value={role.value}>
                                    {role.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <DialogFooter>
                        <Button type="submit">שמור משתמש</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            )}
          </div>

          <div className="space-y-2">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex justify-between items-center p-4 rounded-lg border"
              >
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      user.isActive ? "bg-green-100" : "bg-gray-200"
                    }`}
                  >
                    <User
                      size={20}
                      className={user.isActive ? "text-green-600" : "text-gray-400"}
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{user.name}</h4>
                    <div className="flex text-sm text-muted-foreground space-x-2 rtl:space-x-reverse">
                      <span className="flex items-center">
                        <Mail size={14} className="mr-1" /> {user.email}
                      </span>
                      <span className="flex items-center">
                        <Phone size={14} className="mr-1" /> {user.phone}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="px-2 py-1 text-xs rounded-full bg-gray-100">
                    {userRoles.find((r) => r.value === user.role)?.label || user.role}
                  </div>
                  {user.id !== "1" && (
                    <>
                      <Button
                        variant={user.isActive ? "outline" : "default"}
                        size="sm"
                        onClick={() => toggleUserStatus(user.id)}
                      >
                        {user.isActive ? "השהה" : "הפעל"}
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeUser(user.id)}
                      >
                        <X size={16} />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 