
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Users, 
  FileText, 
  Settings, 
  ChartBar, 
  CreditCard, 
  Upload, 
  Menu, 
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const Sidebar = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside
      className={cn(
        "h-screen bg-sidebar transition-all duration-300 flex flex-col border-l border-sidebar-border",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        {!collapsed && (
          <h1 className="text-white text-xl font-bold">כסף טוב פלוס</h1>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-sidebar-accent text-white"
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="px-2 space-y-1">
          <NavItem
            to="/"
            icon={<Home className="ml-3" size={20} />}
            label="דף הבית"
            collapsed={collapsed}
          />
          <NavItem
            to="/clients"
            icon={<Users className="ml-3" size={20} />}
            label="לקוחות וספקים"
            collapsed={collapsed}
          />
          <NavItem
            to="/documents"
            icon={<FileText className="ml-3" size={20} />}
            label="מסמכים"
            collapsed={collapsed}
          />
          <NavItem
            to="/finance"
            icon={<CreditCard className="ml-3" size={20} />}
            label="ניהול פיננסי"
            collapsed={collapsed}
          />
          <NavItem
            to="/reports"
            icon={<ChartBar className="ml-3" size={20} />}
            label="דוחות"
            collapsed={collapsed}
          />
          <NavItem
            to="/documents/upload"
            icon={<Upload className="ml-3" size={20} />}
            label="העלאת מסמכים"
            collapsed={collapsed}
          />
          <NavItem
            to="/settings"
            icon={<Settings className="ml-3" size={20} />}
            label="הגדרות מערכת"
            collapsed={collapsed}
          />
        </nav>
      </div>

      <div className="p-4 border-t border-sidebar-border">
        {!collapsed && (
          <div className="text-white text-xs text-center">
            <div>Ypay © 2025</div>
          </div>
        )}
      </div>
    </aside>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, collapsed }) => {
  return (
    <Link
      to={to}
      className="flex items-center p-2 text-white hover:bg-sidebar-accent rounded-md group transition-all"
    >
      <span>{icon}</span>
      {!collapsed && <span className="text-sm">{label}</span>}
      {collapsed && (
        <div className="absolute left-12 bg-sidebar-accent text-white px-2 py-1 rounded text-xs hidden group-hover:block">
          {label}
        </div>
      )}
    </Link>
  );
};
