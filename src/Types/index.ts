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

export type TechUpdate = {
  status?: string;
};

export type Work = {
  id?: string;
  title: string;
  description: string;
  deploy_url: string;
};

export type WorkUpdate = {
  title?: string;
  description?: string;
  deploy_url?: string;
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

export type UserUpdate = {
  name: string;
  contact: string;
  old_password: string;
  password: string;
};

export type UserTypes = {
  user: User;
  users: User[];
  handleGetUser: () => Promise<void>;
  handleGetUsers: () => Promise<void>;
  handleUpdateUser: (data: UserUpdate) => Promise<void>;

  handleCreateTech: (data: Tech) => Promise<void>;
  handleUpdateTech: (data: TechUpdate, id: string) => Promise<void>;
  handleDeleteTech: (id: string) => Promise<void>;

  handleCreateWork: (data: Work) => Promise<void>;
  handleUpdateWork: (data: WorkUpdate, id: string) => Promise<void>;
  handleDeleteWork: (id: string) => Promise<void>;
}

