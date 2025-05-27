import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, Menu, X, LayoutDashboard, Package, Users, 
  ShoppingCart, BarChart3, LogOut, Settings, Tag
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const isAdmin = user?.role === 'admin';
  const isSeller = user?.role === 'seller';
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const adminLinks = [
    { to: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/admin/users', icon: <Users size={20} />, label: 'Users' },
    { to: '/admin/products', icon: <Package size={20} />, label: 'Products' },
    { to: '/admin/sellers', icon: <Users size={20} />, label: 'Sellers' },
    { to: '/admin/categories', icon: <Tag size={20} />, label: 'Categories' },
  ];
  
  const sellerLinks = [
    { to: '/seller', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/seller/products', icon: <Package size={20} />, label: 'Products' },
    { to: '/seller/orders', icon: <ShoppingCart size={20} />, label: 'Orders' },
    { to: '/seller/analytics', icon: <BarChart3 size={20} />, label: 'Analytics' },
  ];
  
  const links = isAdmin ? adminLinks : sellerLinks;
  
  const isLinkActive = (path: string) => {
    if (path === '/admin' || path === '/seller') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex items-center justify-between border-b px-6 py-4">
            <Link to="/" className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold">ShopHub</span>
            </Link>
            <button onClick={toggleSidebar} className="lg:hidden">
              <X size={24} />
            </button>
          </div>
          
          {/* Sidebar links */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                      isLinkActive(link.to)
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Sidebar footer */}
          <div className="border-t p-4">
            <ul className="space-y-1">
              <li>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <Settings size={20} />
                  Settings
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Dashboard header */}
        <header className="bg-white shadow">
          <div className="flex h-16 items-center justify-between px-4">
            <button
              onClick={toggleSidebar}
              className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 lg:hidden"
            >
              <Menu size={24} />
            </button>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>
        
        {/* Dashboard content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;