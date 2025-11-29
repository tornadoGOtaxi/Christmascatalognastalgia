import React, { useState } from 'react';
import { Product, RegistryItem } from '../types';
import { Trash2, Share2, CheckSquare, Square, Download, Gift } from 'lucide-react';

interface RegistryProps {
  items: RegistryItem[];
  onRemove: (id: string) => void;
  onTogglePurchased: (id: string) => void;
}

export const Registry: React.FC<RegistryProps> = ({ items, onRemove, onTogglePurchased }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    // Mock share link generation
    const mockLink = `https://catalog.holiday/registry/${Math.random().toString(36).substring(7)}`;
    navigator.clipboard.writeText(mockLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-center p-8">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md mb-6">
          <Gift className="w-10 h-10 text-holiday-red" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Registry is Empty</h2>
        <p className="text-gray-500 max-w-md">Browse the catalog and tap the heart icon to add items to your holiday wishlist.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">My Holiday Registry</h1>
              <p className="text-gray-500">{items.length} items • Total Value: <span className="font-bold text-holiday-green">${totalPrice.toFixed(2)}</span></p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-holiday-green text-white rounded-lg hover:bg-green-800 transition-colors shadow-sm"
              >
                <Share2 className="w-4 h-4" />
                {copied ? 'Link Copied!' : 'Share Registry'}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                Export PDF
              </button>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100 text-sm text-yellow-800 flex items-start gap-3">
            <Gift className="w-5 h-5 shrink-0" />
            <p>Share this link with family! Guests can mark items as "Purchased" to avoid duplicates. Prices are frozen at the time of adding.</p>
          </div>
        </div>

        {/* List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Item</th>
                <th className="px-6 py-4">Store</th>
                <th className="px-6 py-4 text-right">Price</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={item.imageUrl} alt={item.title} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                      <div>
                        <div className="font-medium text-gray-900">{item.title}</div>
                        <div className="text-xs text-gray-400">Added Today</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                       Store #{item.storeId}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-gray-900">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => onTogglePurchased(item.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        item.purchased 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {item.purchased ? <CheckSquare className="w-3 h-3" /> : <Square className="w-3 h-3" />}
                      {item.purchased ? 'Purchased' : 'Available'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2"
                      title="Remove from Registry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};