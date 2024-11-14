import USERS from "@/mocks/user";

const useAuth = () => {
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

  const isAuthenticated = () => {};

  return { authenticate, isAuthenticated };
};

export default useAuth;
