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

const getInitialState = (): AuthState => {
    if (typeof window !== "undefined") {
        const storedState = localStorage.getItem("auth-storage");
        if (storedState) {
            return JSON.parse(storedState).state;
        }
    }
    return {
        user: null,
        isLoading: false,
        error: null,
        login: async () => {},
        logout: () => {}
    };
};

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            ...getInitialState(),
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
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ user: state.user})
        }
    )
);

export default useAuthStore;