import React, { useState } from 'react';
import { Store } from '../types';
import { Play, Settings, RefreshCw, AlertCircle, Database, Server } from 'lucide-react';

interface AdminPanelProps {
  stores: Store[];
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ stores }) => {
  const [scraping, setScraping] = useState<Record<string, boolean>>({});
  const [jobStatus, setJobStatus] = useState<string>('Idle');

  const toggleScrape = (id: string) => {
    setScraping(prev => ({ ...prev, [id]: true }));
    // Simulate API call
    setTimeout(() => {
      setScraping(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const runGlobalSync = () => {
    setJobStatus('Queuing jobs...');
    setTimeout(() => setJobStatus('Scraping Walmart (API)...'), 1000);
    setTimeout(() => setJobStatus('Scraping Shopify feeds...'), 2500);
    setTimeout(() => setJobStatus('Normalizing data...'), 4000);
    setTimeout(() => setJobStatus('Idle - Last run: Just now'), 5500);
  };

  return (
    <div className="flex-1 bg-gray-100 overflow-y-auto p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Settings className="w-6 h-6" />
          Admin Console
        </h1>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">System Status</h3>
            <div className="flex items-center gap-2 text-green-600 font-bold text-lg">
              <Server className="w-5 h-5" />
              Operational
            </div>
            <p className="text-xs text-gray-400 mt-2">v2.4.0-prod (Docker)</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
             <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Product Database</h3>
             <div className="flex items-center gap-2 text-blue-600 font-bold text-lg">
               <Database className="w-5 h-5" />
               12,405 Items
             </div>
             <p className="text-xs text-gray-400 mt-2">Postgres (RDS)</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
             <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Job Queue</h3>
             <div className="flex items-center gap-2 text-purple-600 font-bold text-lg">
               <RefreshCw className={`w-5 h-5 ${jobStatus !== 'Idle' ? 'animate-spin' : ''}`} />
               {jobStatus === 'Idle' ? 'Ready' : 'Processing'}
             </div>
             <p className="text-xs text-gray-400 mt-2">{jobStatus}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h2 className="font-bold text-gray-800">Scraper Status & Controls</h2>
            <button 
              onClick={runGlobalSync}
              disabled={jobStatus !== 'Idle'}
              className="px-4 py-2 bg-stone-800 text-white rounded-lg text-sm font-medium hover:bg-stone-900 disabled:opacity-50"
            >
              Run Global Sync
            </button>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500 bg-gray-50 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-3">Store</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Health</th>
                <th className="px-6 py-3">Last Sync</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stores.map(store => (
                <tr key={store.id}>
                  <td className="px-6 py-4 font-medium flex items-center gap-2">
                    <span className="text-lg">{store.logo}</span>
                    {store.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs uppercase">{store.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-green-600">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      Healthy
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">24 mins ago</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => toggleScrape(store.id)}
                      disabled={scraping[store.id]}
                      className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
                    >
                      {scraping[store.id] ? 'Running...' : <Play className="w-4 h-4" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-4">
          <AlertCircle className="w-6 h-6 text-yellow-600 shrink-0" />
          <div>
            <h4 className="font-bold text-yellow-800">Deployment Note</h4>
            <p className="text-sm text-yellow-700 mt-1">
              Ensure <code>deploy.sh</code> is run after modifying `robots.txt` configurations.
              Current environment: <strong>Staging</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};