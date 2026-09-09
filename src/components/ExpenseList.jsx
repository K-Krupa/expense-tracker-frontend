import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axiosConfig';

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
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
    }, []);

    if (isLoading) {
        return <div className="text-center py-8 text-gray-500">Ładowanie wydatkow...</div>
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
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
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExpenseList;