const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <nav className="bg-white shadow-md p-4">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600">Expense Tracker</h1>
                    <span className="text-sm text-gray-500">Twój budżet pod kontrolą</span>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto p-4 mt-6">
                {children}
            </main>
        </div>
    );
};

export default Layout;