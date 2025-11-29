import React, { useState, useMemo, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { CatalogViewer } from './components/CatalogViewer';
import { Registry } from './components/Registry';
import { AdminPanel } from './components/AdminPanel';
import { PRODUCTS, STORES } from './constants';
import { FilterState, Product, RegistryItem, ViewMode } from './types';
import { Book, Gift, Settings } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<ViewMode>('catalog');
  
  // -- State --
  // Active filters are what the catalog currently shows
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    selectedStoreIds: STORES.slice(0, 4).map(s => s.id),
    ageRange: [0, 18],
    gender: 'all',
    maxPrice: 500,
    categories: [],
    searchQuery: ''
  });

  // Pending filters are the UI state in the control panel (draft)
  const [pendingFilters, setPendingFilters] = useState<FilterState>(activeFilters);
  const [registryItems, setRegistryItems] = useState<RegistryItem[]>([]);
  const [isPanelExpanded, setIsPanelExpanded] = useState(true);

  // -- Derived State --
  
  // Identify stores that MUST be selected because the user has items from them in the registry
  const lockedStoreIds = useMemo(() => {
    return new Set(registryItems.map(item => item.storeId));
  }, [registryItems]);

  // Synchronize locked stores into pending filters whenever registry changes
  useEffect(() => {
    const lockedArray = Array.from(lockedStoreIds);
    const missingLocked = lockedArray.some(id => !pendingFilters.selectedStoreIds.includes(id));
    
    if (missingLocked) {
      setPendingFilters(prev => ({
        ...prev,
        selectedStoreIds: Array.from(new Set([...prev.selectedStoreIds, ...lockedArray]))
      }));
    }
  }, [lockedStoreIds, pendingFilters.selectedStoreIds]);

  // Catalog Filtering (Uses activeFilters)
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      // Store Filter
      if (activeFilters.selectedStoreIds.length > 0 && !activeFilters.selectedStoreIds.includes(p.storeId)) return false;
      
      // Age Filter
      if (p.ageMin > activeFilters.ageRange[1]) return false;
      
      // Gender Filter
      if (activeFilters.gender !== 'all' && p.gender !== 'neutral' && p.gender !== activeFilters.gender) return false;

      // Category Filter
      if (activeFilters.categories.length > 0 && !activeFilters.categories.includes(p.category)) return false;

      return true;
    });
  }, [activeFilters]);

  // -- Handlers --

  const handleApplyFilters = () => {
    setActiveFilters(pendingFilters);
    setIsPanelExpanded(false); // Auto collapse on submit to show result
  };

  const addToRegistry = (product: Product) => {
    if (registryItems.find(i => i.id === product.id)) return;
    const newItem: RegistryItem = { ...product, addedAt: Date.now(), purchased: false, quantity: 1 };
    setRegistryItems([...registryItems, newItem]);
  };

  const removeFromRegistry = (id: string) => {
    setRegistryItems(items => items.filter(i => i.id !== id));
  };

  const togglePurchased = (id: string) => {
    setRegistryItems(items => items.map(i => i.id === id ? { ...i, purchased: !i.purchased } : i));
  };

  const registryIds = useMemo(() => new Set(registryItems.map(i => i.id)), [registryItems]);

  return (
    <div className="flex h-screen bg-holiday-cream overflow-hidden">
      
      {/* Navigation Rail */}
      <nav className="w-16 bg-holiday-dark flex flex-col items-center py-6 gap-8 z-30 shrink-0 no-print border-r border-stone-800">
        <div className="text-holiday-gold">
          <Gift className="w-8 h-8" />
        </div>
        
        <div className="flex flex-col gap-6 w-full px-2">
          <button 
            onClick={() => setView('catalog')}
            className={`p-3 rounded-xl transition-all flex flex-col items-center gap-1 ${view === 'catalog' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Book className="w-5 h-5" />
            <span className="text-[10px] font-medium">Catalog</span>
          </button>
          
          <button 
            onClick={() => setView('registry')}
            className={`p-3 rounded-xl transition-all flex flex-col items-center gap-1 relative ${view === 'registry' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Gift className="w-5 h-5" />
            <span className="text-[10px] font-medium">Registry</span>
            {registryItems.length > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-holiday-red rounded-full"></span>
            )}
          </button>

          <button 
            onClick={() => setView('admin')}
            className={`p-3 rounded-xl transition-all flex flex-col items-center gap-1 ${view === 'admin' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-[10px] font-medium">Admin</span>
          </button>
        </div>
      </nav>

      {/* Main Layout Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* View Content */}
        <div className="flex-1 overflow-hidden relative w-full">
          {view === 'catalog' && (
            <CatalogViewer 
              products={filteredProducts} 
              stores={STORES}
              filters={activeFilters}
              onAddToRegistry={addToRegistry}
              registryIds={registryIds}
            />
          )}

          {view === 'registry' && (
            <Registry 
              items={registryItems} 
              onRemove={removeFromRegistry}
              onTogglePurchased={togglePurchased}
            />
          )}

          {view === 'admin' && (
            <AdminPanel stores={STORES} />
          )}
        </div>

        {/* Bottom Control Panel: Only show in Catalog view */}
        {view === 'catalog' && (
          <Sidebar 
            stores={STORES} 
            filters={pendingFilters} 
            onFilterChange={setPendingFilters} 
            onApply={handleApplyFilters}
            productCount={filteredProducts.length} // Show actual count
            lockedStoreIds={lockedStoreIds}
            isExpanded={isPanelExpanded}
            setIsExpanded={setIsPanelExpanded}
          />
        )}
      </main>
    </div>
  );
}