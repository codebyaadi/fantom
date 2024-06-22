import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface User {
    name: string;
    email: string;
    username: string;
    avatar: string;
}

interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    login: (identity: string, password: string) => Promise<void>;
    logout: () => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isLoading: false,
            error: null,
            login: async (identity, password) => {
                try {
                    set({ isLoading: true, error: null });
                    const response = await axios.post("http://localhost:3000/login", { identity, password });
                    if (response.status === 200) {
                        set({ user: response.data.user, isLoading: false });
                    } else {
                        set({ error: response.data.message, isLoading: false });
                    }
                } catch (error) {
                    set({ error: "Internal Server Error", isLoading: false });
                }
            },
            logout: () => set({ user: null })
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({ user: state.user})
        }
    )
);

export default useAuthStore;