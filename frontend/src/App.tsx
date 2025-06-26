import { AuthProvider } from "./contexts/AuthContext.tsx";
import Navbar from "./components/Navbar.tsx";
import Content from "./components/Content.tsx";
import Footer from "./components/Footer.tsx";

export default function App() {
  return (
    <AuthProvider>
      <div className="flex min-h-screen w-screen flex-col">
        <Navbar />
        <Content />
        <Footer />
      </div>
    </AuthProvider>
  );
}
