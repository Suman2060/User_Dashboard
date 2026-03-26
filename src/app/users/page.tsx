import getUsers from "@/services/userService";
import UserList from "@/components/UserList";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-16 dark:from-slate-900 dark:to-slate-800 transition-colors duration-500">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4 tracking-tight">
            User Directory
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
            Discover and connect with amazing minds. Search through the directory to view activity and posts.
          </p>
        </header>
        
        <UserList initialUsers={users} />
      </div>
    </main>
  );
}
