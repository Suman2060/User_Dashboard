import getUsers from "@/services/userService";
import UserList from "@/components/UserList";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            User Dashboard
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            View and manage user details and their activity
          </p>
        </header>
        
        <UserList initialUsers={users} />
      </div>
    </main>
  );
}
