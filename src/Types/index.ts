// Área relacionada ao AuthContext

export type DataLogin = {
  email: string;
  password: string;
}

export type DataRegister = {
  email: string;
  password: string;
  name: string;
  bio?: string;
  contact?: string;
  course_module: string;
};

export interface iAuthProvider {
  children: React.ReactNode
}

export type AuthTypes = {
  registerUser(data: DataRegister): void;
  loginUser(data: DataLogin): void;
  logoutUser(): void;
}

// Área relacionada ao UserContext

export interface iUserProvider {
  children: React.ReactNode
}

export type Tech = {
  id?: string;
  title: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
};

export type Work = {
  title: string;
  description: string;
  deploy_url: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  course_module: string;
  bio: string;
  contact: string;
  techs: Tech[];
  works: Work[];created_at: string;updated_at: string;avatar_url: string | null;
};

export type UserTypes = {
  user: User;
  users: User[];
  handleGetUser: () => Promise<void>;
  handleGetUsers: () => Promise<void>;
  handleCreateTech: (data: Tech) => Promise<void>;
  handleCreateWork: (data: Work) => Promise<void>;
}

