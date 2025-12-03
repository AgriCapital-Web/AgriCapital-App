import { ReactNode, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NotificationCenter } from "@/components/common/NotificationCenter";
import logoWhite from "@/assets/logo-white.png";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  Sprout, 
  CreditCard, 
  LogOut, 
  Menu,
  Shield,
  UsersRound,
  Receipt,
  Plus,
  Smartphone,
  UserCheck,
  BarChart3,
  Ticket,
  Wallet
} from "lucide-react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { signOut, profile, hasRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const canViewPaiements = hasRole('super_admin') || hasRole('directeur_general') || 
    hasRole('responsable_financier') || hasRole('agent_service_client');
  
  const canViewCommissions = hasRole('super_admin') || hasRole('pdg') || hasRole('directeur_general') ||
    hasRole('responsable_financier') || hasRole('comptable') || hasRole('technico_commercial') ||
    hasRole('chef_equipe') || hasRole('responsable_zone');

  const canViewRapports = hasRole('super_admin') || hasRole('pdg') || hasRole('directeur_general') ||
    hasRole('directeur_technico_commercial') || hasRole('responsable_zone');

  const menuItems = [
    { icon: LayoutDashboard, label: "Tableau de bord", path: "/dashboard" },
    { icon: Plus, label: "Nouvelle Souscription", path: "/nouvelle-souscription" },
    { icon: Users, label: "Planteurs", path: "/souscriptions" },
    { icon: Sprout, label: "Plantations", path: "/plantations" },
    { icon: CreditCard, label: "Paiements", path: "/paiements", requireRole: canViewPaiements },
    { icon: Smartphone, label: "Paiements Wave", path: "/paiements-wave", requireRole: canViewPaiements },
    { icon: UsersRound, label: "Équipes", path: "/equipes" },
    { icon: Receipt, label: "Commissions", path: "/commissions", requireRole: canViewCommissions },
    { icon: BarChart3, label: "Rapports Technico-Comm.", path: "/rapports-techniques", requireRole: canViewRapports },
    { icon: Wallet, label: "Portefeuilles", path: "/portefeuilles", requireRole: canViewCommissions },
    { icon: Ticket, label: "Tickets", path: "/tickets" },
    { icon: UserCheck, label: "Demandes de compte", path: "/account-requests", adminOnly: true },
    { icon: Shield, label: "Paramètres", path: "/parametres", adminOnly: true },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-primary">
      <div className="p-4 border-b border-white/10 flex justify-center">
        <img src={logoWhite} alt="AgriCapital" className="h-16 w-auto object-contain" />
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {menuItems
          .filter(item => {
            if (item.adminOnly && !hasRole('super_admin')) return false;
            if (item.requireRole !== undefined && !item.requireRole) return false;
            return true;
          })
          .map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className={cn(
                "w-full justify-center text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground transition-all",
                "focus:bg-primary-foreground/20 p-3",
                location.pathname === item.path && "bg-primary-foreground/20"
              )}
              onClick={() => {
                navigate(item.path);
                setOpen(false);
              }}
              title={item.label}
            >
              <item.icon className="h-5 w-5" />
            </Button>
          ))}
      </nav>

      <div className="p-4 border-t border-white/10 flex flex-col gap-2">
        <NotificationCenter />
        <Button
          variant="ghost"
          className="w-full justify-center text-primary-foreground hover:bg-destructive hover:text-white transition-all p-3"
          onClick={handleLogout}
          title="Déconnexion"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-20 flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-40 bg-accent text-accent-foreground hover:bg-accent/90">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pt-16 md:pt-0">
        <div className="container mx-auto p-3 sm:p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
