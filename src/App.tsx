import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Planteurs from "./pages/Souscriptions";
import PlanteurDetail from "./pages/PlanteurDetail";
import Plantations from "./pages/Plantations";
import Paiements from "./pages/Paiements";
import Utilisateurs from "./pages/Utilisateurs";
import RapportsFinanciers from "./pages/RapportsFinanciers";
import RapportsTechniques from "./pages/RapportsTechniques";
import Commissions from "./pages/Commissions";
import PortefeuilleClients from "./pages/PortefeuilleClients";
import Portefeuilles from "./pages/Portefeuilles";
import Equipes from "./pages/Equipes";
import Promotions from "./pages/Promotions";
import NouvelleSouscription from "./pages/NouvelleSouscription";
import Parametres from "./pages/Parametres";
import HistoriqueComplet from "./pages/HistoriqueComplet";
import AccountRequest from "./pages/AccountRequest";
import AccountRequests from "./pages/AccountRequests";
import CreateSuperAdmin from "./pages/CreateSuperAdmin";
import PaiementsWave from "./pages/PaiementsWave";
import Tickets from "./pages/Tickets";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/account-request" element={<AccountRequest />} />
            <Route path="/create-super-admin" element={<CreateSuperAdmin />} />
            
            {/* Protected routes - Dashboard & Core */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/account-requests" element={<AccountRequests />} />
            
            {/* Planteurs & Plantations */}
            <Route path="/souscriptions" element={<Planteurs />} />
            <Route path="/planteur/:id" element={<PlanteurDetail />} />
            <Route path="/planteur/:id/historique" element={<HistoriqueComplet />} />
            <Route path="/plantations" element={<Plantations />} />
            <Route path="/nouvelle-souscription" element={<NouvelleSouscription />} />
            
            {/* Paiements */}
            <Route path="/paiements" element={<Paiements />} />
            <Route path="/paiements-wave" element={<PaiementsWave />} />
            
            {/* Équipes & Utilisateurs */}
            <Route path="/utilisateurs" element={<Utilisateurs />} />
            <Route path="/equipes" element={<Equipes />} />
            
            {/* Rapports */}
            <Route path="/rapports-financiers" element={<RapportsFinanciers />} />
            <Route path="/rapports-techniques" element={<RapportsTechniques />} />
            
            {/* Finances */}
            <Route path="/commissions" element={<Commissions />} />
            <Route path="/portefeuille-clients" element={<PortefeuilleClients />} />
            <Route path="/portefeuilles" element={<Portefeuilles />} />
            
            {/* Support */}
            <Route path="/tickets" element={<Tickets />} />
            
            {/* Admin */}
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/parametres" element={<Parametres />} />
            
            {/* Catch-all 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
