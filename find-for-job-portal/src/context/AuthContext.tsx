import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { initialUsers } from '../data/mockUsers';

interface AuthContextType {
  currentUser: User;
  currentRole: UserRole;
  switchRole: (role: UserRole) => void;
  loginAs: (role: UserRole) => void;
  updateProfile: (updatedData: Partial<User>) => void;
  allUsers: User[];
  toggleUserStatus: (userId: string) => void;
  signupDemo: (name: string, email: string, role: UserRole, companyName?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_USERS = 'findfor_users_v1';
const LOCAL_STORAGE_ACTIVE_ROLE = 'findfor_active_role_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_USERS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved users', e);
      }
    }
    return initialUsers;
  });

  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_ACTIVE_ROLE);
    if (saved === 'candidate' || saved === 'employer' || saved === 'admin') {
      return saved;
    }
    return 'candidate';
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_ACTIVE_ROLE, currentRole);
  }, [currentRole]);

  // Find active user based on current role
  const currentUser = users.find((u) => u.role === currentRole && u.status === 'active') || users[0];

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
  };

  const loginAs = (role: UserRole) => {
    setCurrentRole(role);
  };

  const logout = () => {
    // Keep user on candidate demo role
    setCurrentRole('candidate');
  };

  const updateProfile = (updatedData: Partial<User>) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === currentUser.id ? { ...user, ...updatedData } : user))
    );
  };

  const toggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            status: user.status === 'active' ? 'suspended' : 'active',
          };
        }
        return user;
      })
    );
  };

  const signupDemo = (name: string, email: string, role: UserRole, companyName?: string) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80',
      status: 'active',
      joinedDate: new Date().toISOString().split('T')[0],
      companyName: role === 'employer' ? companyName || 'My Startup' : undefined,
      title: role === 'candidate' ? 'Product & Software Specialist' : 'Hiring Manager',
      location: 'Remote, US',
      skills: role === 'candidate' ? ['React', 'TypeScript', 'UI/UX'] : undefined
    };

    setUsers((prev) => [newUser, ...prev]);
    setCurrentRole(role);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole,
        switchRole,
        loginAs,
        updateProfile,
        allUsers: users,
        toggleUserStatus,
        signupDemo,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
