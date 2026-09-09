import { useState } from 'react'
import toast from 'react-hot-toast';
import api from '../api/axiosConfig';

const ExpenseForm = ( {onExpenseAdded }) => {
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        description: '',
        date: '',
        type: 'ONE_TIME',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const toastId = toast.loading('Zapisywanie wydatku...');

        try {
            const payload = {
                ...formData,
                amount: parseFloat(formData.amount)
            };
            await api.post('', payload);

            toast.success("Wydatek został dodany!", { id: toastId });
            onExpenseAdded();
            setFormData({
                amount: '',
                category: '',
                description: '',
                date: '',
                type: 'ONE_TIME',
            });
        } catch (error) {
            console.error("Błąd API:", error);
            toast.error("Nie udało się zapisać. sprawdź połączenie z serwerem.", { id: toastId })
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Dodaj nowy wydatek</h2>

            <div className="grid grid-cols-1 md:grid-cols2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kwota (PLN)</label>
                    <input type="number" step="0.01" name="amount" value={formData.amount} onChange={handleChange} required 
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Typ</label>
                    <select name="type" value={formData.type} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="ONE_TIME">Jednorazowy</option>
                        <option value="RECURRING">Cykliczny</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kategoria</label>
                    <input type="text" name="category" value={formData.category} onChange={handleChange} required
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Opis</label>
                    <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="np. Bilet na pociąg" required
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                </div>
            </div>

            <button type="submit" className="mt-6 w-fulll bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Zapisz wydatek
            </button>
        </form>
    );
};

export default ExpenseForm;
