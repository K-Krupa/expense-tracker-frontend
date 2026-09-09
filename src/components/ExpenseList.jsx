import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axiosConfig';
import ExpenseSummary from './ExpenseSummary';

const ExpenseList = ({ refreshTrigger }) => {
    const [expenses, setExpenses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, expenseId: null });
    
    const fetchExpenses = async () => {
        try {
          const response = await api.get('');
          setExpenses(response.data);   
        } catch (error) {
            console.error("Błąd pobierania danych: ", error);
            toast.error("Nie udało się pobrać listy wydatków.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, [refreshTrigger]);

    const openDeleteModal = (id) => {
        setDeleteModal({ isOpen: true, expenseId: id});
    };

    const confirmDelete = async () => {
        const toastId = toast.loading('Usuwanie wydatku...');
        try {
            await api.delete(`/${deleteModal.expenseId}`);
            toast.success("Wydatek został usunięty!", { id: toastId });
            setDeleteModal({ isOpen: false, expenseId: null });
            fetchExpenses();
        } catch (error) {
            console.error("Nie udało się usunąć wpisu.", error);
            toast.error("Nie udało się usunąć wpisu.", { id: toastId });
            setDeleteModal({ isOpen: false, expenseId: null });
        }
    };


    if (isLoading) {
        return <div className="text-center py-8 text-gray-500">Ładowanie wydatkow...</div>
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <ExpenseSummary expenses={expenses} />
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Historia wydatków</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-200 text-sm text-gray-600">
                            <th className="p-3 font-medium">Data</th>
                            <th className="p-3 font-medium">Opis</th>
                            <th className="p-3 font-medium">Kategoria</th>
                            <th className="p-3 font-medium">Typ</th>
                            <th className="p-3 font-medium text-right">Kwota</th>
                            <th className="p-3 font-medium text-center">Akcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="p-4 text-center text-gray-500">Brak wydatków do wyświetlenia.</td>
                            </tr>
                        ) : (
                            expenses.map((expense) => (
                                <tr key={expense.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="p-3 text-sm">{expense.date}</td>
                                    <td className="p-3 text-sm font-medium text-gray-800">{expense.description}</td>
                                    <td className="p-3 text-sm text-gray-600">{expense.category}</td>
                                    <td className="p-3 text-sm">
                                        <span className={`px-2 py-1 rounded-full text-xs font medium ${expense.type === 'ONE_TIME' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                                            {expense.type === 'ONE_TIME' ? 'Jednorazowy' : 'Cykliczny'}
                                        </span>
                                    </td>
                                    <td className="p-3 text-sm font-semibold text-right text-red-600">
                                        -{expense.amount.toFixed(2)} PLN 
                                    </td>
                                    <td className="p-3 text-sm font-semibold text-right text-red-600">
                                        <button onClick={() => openDeleteModal(expense.id)} 
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition-colors" 
                                        title="usuń wpis">
                                            Usuń
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {deleteModal.isOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className= "bg-white rounded-xl shadow-2xl max-w-sm w-full  p-6 animate-fade-in">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Potwierdź usunięcie</h3>
                        <p className="text-gray-600 mb-6 text-sm">
                            Czy na pewno chcesz trwale usunąć ten wydatek? Tej operacji nie można cofnąć.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button 
                onClick={() => setDeleteModal({ isOpen: false, expenseId: null })}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Anuluj
              </button>
              <button 
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Tak, usuń
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ExpenseList;