
import React, { useState, useEffect } from 'react';
import { Product, Store, CatalogLayout, FilterState } from '../types';
import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Printer, BookOpen, Grid as GridIcon, X, Star, MessageSquare, Snowflake, ZoomIn } from 'lucide-react';

interface CatalogViewerProps {
  products: Product[];
  stores: Store[];
  filters: FilterState;
  onAddToRegistry: (product: Product) => void;
  registryIds: Set<string>;
}

interface ProductCardProps {
  product: Product;
  minimalist?: boolean;
  store?: Store;
  inRegistry: boolean;
  onAddToRegistry: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

interface ProductModalProps {
  product: Product;
  store?: Store;
  onClose: () => void;
  inRegistry: boolean;
  onAddToRegistry: (product: Product) => void;
}

// --- Components ---

const CoverPage = () => (
  <div className="h-full w-full bg-gradient-to-br from-holiday-red to-red-900 flex flex-col items-center justify-center p-12 text-white text-center relative overflow-hidden border-l border-red-950 shadow-inner perspective-1000">
    {/* Texture Overlay */}
    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay pointer-events-none"></div>
    
    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
       <div className="absolute top-10 left-10"><Snowflake className="w-24 h-24 text-white" /></div>
       <div className="absolute bottom-10 right-10"><Snowflake className="w-32 h-32 text-gold-200" /></div>
    </div>

    <div className="z-10 border-[6px] border-yellow-500/80 p-10 max-w-md w-full bg-red-900/40 backdrop-blur-sm shadow-2xl relative">
       {/* Corner decorations */}
       <div className="absolute -top-3 -left-3 w-8 h-8 border-t-4 border-l-4 border-yellow-400"></div>
       <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-4 border-r-4 border-yellow-400"></div>

      <h3 className="text-yellow-400 font-sans tracking-[0.4em] uppercase text-xs mb-6 font-bold">The Official 2024</h3>
      <h1 className="font-serif text-7xl font-bold mb-4 leading-none text-white drop-shadow-md">
        Holiday<br/><span className="italic text-5xl font-normal text-yellow-100">Wish Book</span>
      </h1>
      <div className="w-24 h-1.5 bg-yellow-500 mx-auto mb-8 rounded-full"></div>
      <p className="font-serif text-2xl italic text-yellow-50/90">Premiere Collection</p>
    </div>
    
    <div className="absolute bottom-12 text-xs tracking-[0.2em] opacity-80 uppercase font-medium">
      Curated exclusively for you
    </div>
  </div>
);

const TableOfContents: React.FC<{ filters: FilterState; stores: Store[]; totalItems: number }> = ({ filters, stores, totalItems }) => {
  const selectedStores = stores.filter(s => filters.selectedStoreIds.includes(s.id));
  
  return (
    <div className="h-full w-full bg-[#fdfbf7] p-12 flex flex-col relative text-gray-800">
      {/* Page Texture */}
      <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] pointer-events-none mix-blend-multiply"></div>

      <div className="border-b-4 border-gray-900 pb-6 mb-10 z-10">
        <h2 className="font-serif text-4xl font-bold text-gray-900 tracking-tight">Catalog Index</h2>
        <div className="flex justify-between items-end mt-4">
           <p className="text-gray-500 font-serif italic">Your personalized shopping guide</p>
           <span className="text-xs font-bold uppercase tracking-wider text-holiday-red">{new Date().getFullYear()} Edition</span>
        </div>
      </div>

      <div className="space-y-10 flex-1 z-10">
        
        {/* Stores Section */}
        <div>
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-200 pb-2">Retail Partners</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            {selectedStores.map(store => (
              <div key={store.id} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm text-white ${store.color}`}>
                  {store.logo}
                </div>
                <span className="text-sm font-bold text-gray-700 font-serif">{store.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters Section */}
        <div className="grid grid-cols-2 gap-10">
           <div>
             <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-200 pb-2">Age Group</h3>
             <p className="font-serif text-3xl text-gray-900">0 - {filters.ageRange[1]} <span className="text-sm text-gray-400 italic">yrs</span></p>
           </div>
           <div>
             <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-200 pb-2">Interest</h3>
             <p className="font-serif text-3xl text-gray-900 capitalize">{filters.gender === 'all' ? 'Everything' : filters.gender + 's'}</p>
           </div>
        </div>
      </div>

      <div className="border-t-4 border-gray-900 pt-6 mt-auto z-10">
         <div className="flex justify-between items-center">
            <span className="font-serif font-bold text-lg">Total Collection</span>
            <span className="font-bold text-3xl text-holiday-red">{totalItems} <span className="text-sm text-gray-400 font-normal">items</span></span>
         </div>
      </div>
    </div>
  );
};

const ProductModal: React.FC<ProductModalProps> = ({ product, store, onClose, inRegistry, onAddToRegistry }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Mock thumbnails based on the single image we have
  const images = [product.imageUrl, product.imageUrl, product.imageUrl];

  // Mock reviews
  const reviews = [
    { user: "Sarah M.", rating: 5, text: "My kids absolutely love this! Best gift ever." },
    { user: "Mike T.", rating: 4, text: "Great quality, but shipping took a little while." },
    { user: "Jessica R.", rating: 5, text: "Exactly as described. Highly recommend." }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={onClose}>
      <div 
        className="bg-white rounded-none shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative animate-in fade-in zoom-in duration-300"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Images */}
        <div className="w-full md:w-1/2 bg-stone-100 p-8 flex flex-col gap-4 overflow-y-auto">
          <div className="aspect-square bg-white shadow-lg p-4 flex items-center justify-center">
            <img src={product.imageUrl} alt={product.title} className="max-w-full max-h-full object-contain" />
          </div>
          <div className="flex gap-3 justify-center">
            {images.map((img, i) => (
              <div key={i} className="w-20 h-20 border-2 border-transparent hover:border-holiday-red bg-white p-1 cursor-pointer transition-colors shadow-sm">
                <img src={img} alt={`View ${i}`} className="w-full h-full object-contain" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-1/2 p-10 overflow-y-auto bg-white custom-scrollbar">
            {/* Header */}
            <div className="mb-8 border-b border-gray-100 pb-8">
                <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white ${store?.color || 'bg-gray-500'}`}>{store?.name}</span>
                    <span className="text-xs text-gray-400 uppercase tracking-widest">{product.category}</span>
                </div>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4 leading-tight">{product.title}</h2>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="text-3xl font-bold text-holiday-green font-sans">
                            ${product.price.toFixed(2)}
                            {product.originalPrice && <span className="text-lg text-gray-400 line-through ml-2 font-normal">${product.originalPrice}</span>}
                        </div>
                    </div>
                     <div className="flex items-center text-yellow-500 gap-1">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-bold text-gray-900">{product.rating}</span>
                        <span className="text-gray-400 text-sm">/ 5.0</span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
                <button 
                    onClick={() => onAddToRegistry(product)}
                    className={`flex-1 py-4 px-6 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all ${
                        inRegistry 
                        ? 'bg-stone-100 text-stone-500 cursor-default' 
                        : 'bg-holiday-red text-white hover:bg-red-700 shadow-xl hover:shadow-2xl hover:-translate-y-0.5'
                    }`}
                >
                    <Heart className={`w-5 h-5 ${inRegistry ? 'fill-current' : ''}`} />
                    {inRegistry ? 'Added to Registry' : 'Add to Wishlist'}
                </button>
            </div>

            {/* Description */}
            <div className="mb-8 prose prose-stone">
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-2">Product Details</h3>
                <p className="text-gray-600 leading-relaxed font-serif text-lg">
                    {product.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-stone-100 text-stone-600 text-xs font-medium uppercase tracking-wide">Ages {product.ageMin}-{product.ageMax}</span>
                    <span className="px-3 py-1 bg-stone-100 text-stone-600 text-xs font-medium uppercase tracking-wide">{product.gender === 'neutral' ? 'Unisex' : product.gender}</span>
                </div>
            </div>

            {/* Mock Reviews */}
            <div>
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Verified Reviews
                </h3>
                <div className="space-y-4">
                    {reviews.map((rev, i) => (
                        <div key={i} className="border-b border-gray-50 pb-4 last:border-0">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-sm text-gray-900">{rev.user}</span>
                                <div className="flex text-yellow-400">
                                    {[...Array(rev.rating)].map((_, j) => <Star key={j} className="w-3 h-3 fill-current" />)}
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 italic">"{rev.text}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({ product, minimalist = false, store, inRegistry, onAddToRegistry, onQuickView }) => {
  return (
    <div 
      onClick={() => !minimalist && onQuickView?.(product)}
      className={`relative bg-white group flex flex-col h-full ${minimalist ? '' : 'cursor-pointer hover:z-10'}`}
    >
      {/* Image Area */}
      <div className={`relative w-full overflow-hidden bg-white p-4 flex items-center justify-center ${minimalist ? 'h-32' : 'h-48'}`}>
         <img src={product.imageUrl} alt={product.title} className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110" />
         
         {product.originalPrice && !minimalist && (
           <div className="absolute top-0 left-0 bg-holiday-red text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
             Sale
           </div>
         )}
         
         {!minimalist && (
           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
             <div className="bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full shadow-sm translate-y-4 group-hover:translate-y-0 transition-transform flex items-center gap-1">
                <ZoomIn className="w-3 h-3" /> Quick View
             </div>
           </div>
         )}
      </div>
      
      {/* Content Area */}
      <div className={`flex-1 flex flex-col ${minimalist ? 'p-0' : 'p-2'}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className={`w-1.5 h-1.5 rounded-full ${store?.color || 'bg-gray-400'}`}></span>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{store?.name}</span>
        </div>
        
        <h3 className={`font-serif font-medium text-gray-900 leading-tight mb-1 line-clamp-2 ${minimalist ? 'text-xs' : 'text-sm'}`}>
          {product.title}
        </h3>
        
        <div className="mt-auto pt-2 flex items-end justify-between border-t border-gray-50">
          <div className="flex flex-col">
             {product.originalPrice && (
               <span className="text-[10px] text-gray-400 line-through">${product.originalPrice}</span>
             )}
             <span className={`font-bold text-holiday-dark ${minimalist ? 'text-sm' : 'text-lg'}`}>${product.price}</span>
          </div>
          
          {!minimalist && (
            <button 
              onClick={(e) => { e.stopPropagation(); onAddToRegistry(product); }}
              className={`p-2 rounded-full transition-all ${inRegistry ? 'bg-holiday-red text-white shadow-md' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
              title="Add to Registry"
            >
              <Heart className={`w-4 h-4 ${inRegistry ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const CatalogViewer: React.FC<CatalogViewerProps> = ({ products, stores, filters, onAddToRegistry, registryIds }) => {
  const [page, setPage] = useState(0);
  const [layout, setLayout] = useState<CatalogLayout>('flipbook');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // -- Flipbook Logic --
  const flipbookProductPages = Math.ceil(Math.max(0, products.length - 2) / 4);
  const totalFlipbookPages = 2 + flipbookProductPages;

  const gridPages = Math.ceil(products.length / 12);
  const totalPages = layout === 'flipbook' ? totalFlipbookPages : gridPages;

  useEffect(() => {
    setPage(0);
  }, [products.length, layout]);

  const handleNext = () => setPage(p => Math.min(p + 1, totalPages - 1));
  const handlePrev = () => setPage(p => Math.max(0, p - 1));

  const getStore = (id: string) => stores.find(s => s.id === id);

  const renderFlipbookSpread = () => {
    // --- Styles for the "Page" look ---
    const pageClass = "flex-1 bg-[#fdfbf7] relative shadow-inner overflow-hidden flex flex-col";
    const textureOverlay = <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] pointer-events-none mix-blend-multiply z-0"></div>;
    const shadowCenter = <div className="absolute inset-y-0 w-12 bg-gradient-to-r from-black/10 to-transparent pointer-events-none z-20 mix-blend-multiply left-0"></div>;
    const shadowCenterRight = <div className="absolute inset-y-0 w-12 bg-gradient-to-l from-black/10 to-transparent pointer-events-none z-20 mix-blend-multiply right-0"></div>;

    if (page === 0) {
      // Cover Spread
      return (
        <>
           <div className="flex-1 bg-stone-800 shadow-2xl flex items-center justify-center relative border-r border-stone-950">
             <div className="text-stone-600 font-serif italic text-sm">Inside Front Cover</div>
           </div>
           <div className="flex-1 shadow-2xl z-10 relative">
             <CoverPage />
             {shadowCenter}
           </div>
        </>
      );
    }

    if (page === 1) {
      // TOC + First 2 Products
      const pageProducts = products.slice(0, 2);
      return (
        <>
          <div className={`${pageClass} border-r border-gray-300`}>
             {textureOverlay}
             <TableOfContents filters={filters} stores={stores} totalItems={products.length} />
             {shadowCenterRight}
          </div>
          <div className={`${pageClass}`}>
            {textureOverlay}
            {shadowCenter}
            <div className="h-full flex flex-col p-8 z-10">
              <div className="text-center mb-6 border-b-2 border-holiday-red/10 pb-2">
                 <span className="font-serif italic text-gray-400 text-sm">Featured Selection</span>
              </div>
              <div className="grid grid-cols-2 grid-rows-1 gap-8 h-full items-start">
                {pageProducts.map(p => (
                   <ProductCard 
                      key={p.id} 
                      product={p} 
                      store={getStore(p.storeId)}
                      inRegistry={registryIds.has(p.id)}
                      onAddToRegistry={onAddToRegistry}
                      onQuickView={setSelectedProduct}
                    />
                ))}
              </div>
              <div className="mt-auto text-center pt-4 text-xs text-gray-400 font-serif">1</div>
            </div>
          </div>
        </>
      );
    }

    // Standard Product Spread
    const startIndex = 2 + (page - 2) * 4;
    const leftProducts = products.slice(startIndex, startIndex + 2);
    const rightProducts = products.slice(startIndex + 2, startIndex + 4);
    
    const leftPageNum = 2 + (page - 2) * 2;
    const rightPageNum = leftPageNum + 1;

    return (
       <>
          {/* Left Page */}
          <div className={`${pageClass} border-r border-gray-300`}>
            {textureOverlay}
            {shadowCenterRight}
            <div className="h-full flex flex-col p-8 z-10">
              <div className="text-center mb-6 border-b-2 border-holiday-red/10 pb-2 flex justify-between items-end">
                <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Gift Guide</span>
              </div>
              <div className="grid grid-cols-2 grid-rows-1 gap-8 h-full">
                {leftProducts.map(p => (
                  <ProductCard 
                    key={p.id} 
                    product={p} 
                    store={getStore(p.storeId)}
                    inRegistry={registryIds.has(p.id)}
                    onAddToRegistry={onAddToRegistry}
                    onQuickView={setSelectedProduct}
                  />
                ))}
              </div>
              <div className="mt-auto text-center pt-4 text-xs text-gray-400 font-serif">{leftPageNum}</div>
            </div>
          </div>

          {/* Right Page */}
          <div className={pageClass}>
            {textureOverlay}
            {shadowCenter}
             <div className="h-full flex flex-col p-8 z-10">
              <div className="text-center mb-6 border-b-2 border-holiday-red/10 pb-2 flex justify-end items-end">
                <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">2024 Collection</span>
              </div>
              <div className="grid grid-cols-2 grid-rows-1 gap-8 h-full">
                {rightProducts.map(p => (
                  <ProductCard 
                    key={p.id} 
                    product={p} 
                    store={getStore(p.storeId)}
                    inRegistry={registryIds.has(p.id)}
                    onAddToRegistry={onAddToRegistry}
                    onQuickView={setSelectedProduct}
                  />
                ))}
              </div>
              <div className="mt-auto text-center pt-4 text-xs text-gray-400 font-serif">{rightPageNum}</div>
            </div>
          </div>
       </>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct}
          store={getStore(selectedProduct.storeId)}
          inRegistry={registryIds.has(selectedProduct.id)}
          onAddToRegistry={onAddToRegistry}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Toolbar */}
      <div className="h-16 border-b border-stone-200 bg-white px-6 flex items-center justify-center md:justify-between shrink-0 no-print z-20 shadow-sm">
        <h1 className="text-xl font-serif font-bold text-holiday-red tracking-tight flex items-center gap-2">
           <BookOpen className="w-6 h-6" /> Holiday Wish Book
        </h1>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex bg-stone-100 rounded-lg p-1 border border-stone-200">
            <button 
              onClick={() => setLayout('flipbook')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-2 text-xs font-bold uppercase tracking-wide transition-all ${layout === 'flipbook' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <BookOpen className="w-4 h-4" /> Flipbook
            </button>
            <button 
              onClick={() => setLayout('grid')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-2 text-xs font-bold uppercase tracking-wide transition-all ${layout === 'grid' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <GridIcon className="w-4 h-4" /> Grid View
            </button>
          </div>
          
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-black transition-colors shadow-md text-sm font-medium"
          >
            <Printer className="w-4 h-4" /> Print Catalog
          </button>
        </div>
      </div>

      {/* Main Content Area - Hide on print */}
      <div className="flex-1 overflow-hidden relative bg-stone-200 flex items-center justify-center p-8 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] no-print">
        
        {/* Navigation Buttons (No Print) */}
        <button 
          onClick={handlePrev} 
          disabled={page === 0}
          className="absolute left-6 z-20 p-4 rounded-full bg-white/90 shadow-xl disabled:opacity-30 hover:bg-white hover:scale-110 no-print transition-all text-gray-800"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <button 
          onClick={handleNext} 
          disabled={page === totalPages - 1}
          className="absolute right-6 z-20 p-4 rounded-full bg-white/90 shadow-xl disabled:opacity-30 hover:bg-white hover:scale-110 no-print transition-all text-gray-800"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Content Container */}
        <div className="w-full max-w-6xl h-full flex flex-col items-center justify-center perspective-1000">
          
          {products.length === 0 ? (
            <div className="text-center text-gray-500 bg-white p-12 rounded-xl shadow-xl">
              <p className="text-2xl font-serif text-gray-400 mb-2">No items match your curation.</p>
              <p className="text-sm uppercase tracking-wide font-bold text-gray-300">Try adjusting your filters</p>
            </div>
          ) : (
            <div className={`w-full transition-all duration-500 ${layout === 'flipbook' ? 'flex gap-0 shadow-2xl rounded-sm overflow-hidden bg-white aspect-[3/2] max-h-full border border-gray-300' : 'grid grid-cols-4 gap-6 h-full overflow-y-auto content-start pb-20 pr-2 custom-scrollbar'}`}>
              
              {layout === 'flipbook' ? (
                renderFlipbookSpread()
              ) : (
                // Grid Layout
                products.slice(page * 12, (page + 1) * 12).map(p => (
                  <ProductCard 
                    key={p.id} 
                    product={p} 
                    store={getStore(p.storeId)}
                    inRegistry={registryIds.has(p.id)}
                    onAddToRegistry={onAddToRegistry}
                    onQuickView={setSelectedProduct}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Print Only Layout - Visible on print */}
      <div className="print-only p-8 bg-white w-full h-full">
        {/* Header */}
        <div className="text-center mb-8 border-b-2 border-gray-800 pb-4">
            <div className="flex justify-between items-end">
                <h1 className="text-4xl font-serif font-bold text-gray-900">My Holiday Wishlist</h1>
                <div className="text-right">
                    <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
                    <p className="text-xs text-gray-400">Created with Christmas Catalog</p>
                </div>
            </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-8">
           {products.map(p => (
             <div key={p.id} className="border border-gray-200 p-4 rounded-lg break-inside-avoid flex flex-col items-center text-center">
                 {/* Image */}
                 <div className="h-32 w-full flex items-center justify-center mb-3">
                     <img src={p.imageUrl} alt={p.title} className="max-h-full max-w-full object-contain" />
                 </div>
                 
                 {/* Store */}
                 <div className="flex items-center gap-1 mb-1">
                     <span className={`w-2 h-2 rounded-full ${getStore(p.storeId)?.color || 'bg-gray-500'}`}></span>
                     <span className="text-[10px] font-bold uppercase text-gray-500">{getStore(p.storeId)?.name}</span>
                 </div>

                 {/* Title */}
                 <h3 className="font-serif font-bold text-gray-900 text-sm mb-1 leading-tight">{p.title}</h3>
                 
                 {/* Price */}
                 <p className="text-lg font-bold text-gray-900 mb-2">${p.price}</p>

                 {/* Checkbox for kids */}
                 <div className="mt-auto pt-3 border-t border-gray-100 w-full flex justify-center">
                     <div className="flex items-center gap-2">
                         <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                         <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">I want this!</span>
                     </div>
                 </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};
