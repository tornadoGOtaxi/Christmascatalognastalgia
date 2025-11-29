import React from 'react';
import { Store, FilterState } from '../types';
import { Filter, ShoppingBag, Check, ChevronUp, ChevronDown, Lock, RefreshCw, Layers } from 'lucide-react';
import { CATEGORIES } from '../constants';

interface SidebarProps {
  stores: Store[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onApply: () => void;
  productCount: number;
  lockedStoreIds: Set<string>;
  isExpanded: boolean;
  setIsExpanded: (val: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  stores, 
  filters, 
  onFilterChange, 
  onApply, 
  productCount, 
  lockedStoreIds,
  isExpanded,
  setIsExpanded
}) => {
  
  const toggleStore = (storeId: string) => {
    // Prevent toggling if locked
    if (lockedStoreIds.has(storeId)) return;

    const current = filters.selectedStoreIds;
    let next: string[];
    
    if (current.includes(storeId)) {
      next = current.filter(id => id !== storeId);
    } else {
      if (current.length >= 6) {
        alert("You can select a maximum of 6 stores for the catalog.");
        return;
      }
      next = [...current, storeId];
    }
    onFilterChange({ ...filters, selectedStoreIds: next });
  };

  const toggleCategory = (cat: string) => {
    const current = filters.categories;
    const next = current.includes(cat) 
      ? current.filter(c => c !== cat)
      : [...current, cat];
    onFilterChange({ ...filters, categories: next });
  };

  return (
    <div 
      className={`bg-white border-t border-stone-300 shadow-2xl z-40 transition-all duration-300 ease-in-out flex flex-col no-print ${
        isExpanded ? 'h-[400px]' : 'h-16'
      }`}
    >
      {/* Header / Toggle Bar */}
      <div 
        className="h-16 shrink-0 bg-holiday-green text-white px-6 flex items-center justify-between cursor-pointer hover:bg-green-900 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <Layers className="w-5 h-5" />
          <h2 className="font-serif font-bold text-lg">Catalog Controls</h2>
          {!isExpanded && (
            <span className="text-sm opacity-80 border-l border-green-700 pl-4 ml-2">
              {filters.selectedStoreIds.length} stores selected • {productCount} items active
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium uppercase tracking-wider opacity-80">
            {isExpanded ? 'Collapse' : 'Expand Configuration'}
          </span>
          {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
        </div>
      </div>

      {/* Expanded Content */}
      <div className={`flex-1 overflow-hidden flex flex-row ${!isExpanded && 'opacity-0 invisible'}`}>
        
        {/* Left Col: Store Selection */}
        <div className="w-1/3 border-r border-stone-200 p-6 overflow-y-auto bg-stone-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Stores <span className="text-xs font-normal text-gray-500">({filters.selectedStoreIds.length}/6)</span>
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {stores.map(store => {
              const isSelected = filters.selectedStoreIds.includes(store.id);
              const isLocked = lockedStoreIds.has(store.id);
              return (
                <button
                  key={store.id}
                  onClick={(e) => { e.stopPropagation(); toggleStore(store.id); }}
                  disabled={isLocked}
                  className={`flex items-center gap-2 p-2 rounded-lg border transition-all text-left ${
                    isSelected 
                      ? 'border-holiday-green bg-white shadow-sm ring-1 ring-holiday-green' 
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  } ${isLocked ? 'opacity-70 bg-gray-50 cursor-not-allowed' : ''}`}
                >
                  <div className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-white text-[10px] ${store.color}`}>
                    {store.logo}
                  </div>
                  <span className="flex-1 text-xs font-medium truncate leading-tight">{store.name}</span>
                  {isLocked ? <Lock className="w-3 h-3 text-gray-400" /> : (isSelected && <Check className="w-3 h-3 text-holiday-green" />)}
                </button>
              );
            })}
          </div>
          {lockedStoreIds.size > 0 && (
             <p className="mt-4 text-xs text-gray-400 flex items-center gap-1">
               <Lock className="w-3 h-3" /> Some stores are locked because you have items in your registry.
             </p>
          )}
        </div>

        {/* Middle Col: Filters */}
        <div className="w-1/3 border-r border-stone-200 p-6 overflow-y-auto">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Demographics & Price
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Max Age: {filters.ageRange[1]}y</label>
              <input 
                type="range" 
                min="0" 
                max="18" 
                value={filters.ageRange[1]} 
                onChange={(e) => onFilterChange({...filters, ageRange: [0, parseInt(e.target.value)]})}
                className="w-full h-2 mt-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-holiday-red"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Gender</label>
              <div className="flex bg-gray-100 p-1 rounded-lg mt-2">
                 {['all', 'boy', 'girl'].map((g) => (
                   <button
                    key={g}
                    onClick={() => onFilterChange({...filters, gender: g as any})}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${
                      filters.gender === g ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
                    }`}
                   >
                     {g}
                   </button>
                 ))}
              </div>
            </div>
            
             <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Category Interest</label>
              <div className="mt-2 grid grid-cols-2 gap-1">
                {CATEGORIES.slice(0,8).map(cat => (
                  <label key={cat} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input 
                      type="checkbox" 
                      checked={filters.categories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="rounded border-gray-300 text-holiday-red focus:ring-holiday-red"
                    />
                    <span className="truncate">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Action Area */}
        <div className="w-1/3 p-8 bg-gray-50 flex flex-col justify-center items-center text-center">
          <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">Ready to View?</h3>
          <p className="text-sm text-gray-500 mb-6 max-w-xs">
            Updates to filters will not appear in the catalog until you click the button below.
          </p>
          
          <button 
            onClick={onApply}
            className="group relative w-full max-w-xs bg-holiday-red hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            Update Catalog
          </button>
          
          <p className="mt-4 text-xs text-gray-400">
            This will preserve your registry items.
          </p>
        </div>

      </div>
    </div>
  );
};