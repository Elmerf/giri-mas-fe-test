import LOCAL_STORAGE_KEYS from "@/constant/localStorage";
import USERS from "@/mocks/user";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";

const useAuth = () => {
  const navigate = useNavigate();
  const { removeItem } = useLocalStorage();
  // simulate authentication
  const authenticate = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    return new Promise<Omit<(typeof USERS)[number], "password"> | null>(
      (resolve) => {
        setTimeout(() => {
          const user = USERS.find((user) => user.username === username);
          if (user?.password === password) {
            const { password: _, ...userWithoutPassword } = user;
            resolve({ ...userWithoutPassword });
          } else {
            resolve(null);
          }
        }, 1500);
      }
    );
  };

  const signOut = () => {
    removeItem(LOCAL_STORAGE_KEYS.USER);
    navigate("/login");
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
  };

  return { authenticate, signOut, isAuthenticated };
};

export default useAuth;
