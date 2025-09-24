import React from 'react';
import { Download, ExternalLink, FileSpreadsheet } from 'lucide-react';
import { Spreadsheet } from '../../types';

interface SpreadsheetViewerProps {
  spreadsheet: Spreadsheet;
}

export const SpreadsheetViewer: React.FC<SpreadsheetViewerProps> = ({ spreadsheet }) => {
  const getEmbedUrl = (url: string) => {
    // Convert Google Sheets URL to embed format
    const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (match) {
      return `https://docs.google.com/spreadsheets/d/${match[1]}/edit?usp=sharing&widget=true&headers=false`;
    }
    return url;
  };

  const getDownloadUrl = (url: string) => {
    // Convert Google Sheets URL to download format
    const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (match) {
      return `https://docs.google.com/spreadsheets/d/${match[1]}/export?format=xlsx`;
    }
    return url;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileSpreadsheet className="h-6 w-6 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">{spreadsheet.name}</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            {spreadsheet.download && (
              <a
                href={getDownloadUrl(spreadsheet.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Unduh</span>
              </a>
            )}
            
            <a
              href={spreadsheet.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Buka di Tab Baru</span>
            </a>
          </div>
        </div>
      </div>
      
      <div className="flex-1 bg-gray-50 w-full h-full">
        {spreadsheet.embed ? (
          <iframe
            src={getEmbedUrl(spreadsheet.url)}
            className="w-full h-full border-0"
            style={{ width: '100%', height: '100vh', overflow: 'hidden' }}
            title={spreadsheet.name}
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <FileSpreadsheet className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Spreadsheet tidak dapat ditampilkan
              </h3>
              <p className="text-gray-600 mb-4">
                Klik tombol di atas untuk membuka spreadsheet di tab baru
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};