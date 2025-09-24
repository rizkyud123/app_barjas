export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
  fullName: string;
  email: string;
  createdAt: string;
}

export interface Spreadsheet {
  id: string;
  name: string;
  url: string;
  embed: boolean;
  download: boolean;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface AppConfig {
  app_name: string;
  roles: {
    admin: {
      description: string;
      access: string[];
    };
    user: {
      description: string;
      access: string[];
    };
  };
  spreadsheets: Record<string, Omit<Spreadsheet, 'id'>>;
  features: Record<string, boolean>;
}