const ExpenseSummary = ( { expenses }) => {
    const totalAmount = expenses.reduce((sum, item) => sum + item.amount, 0);

    const oneTimeAmount = expenses
    .filter(item => item.type === 'ONE_TIME')
    .reduce((sum, item) => sum + item.amount, 0);

    const recurringAmount = expenses
    .filter(item => item.type === 'RECURRING')
    .reduce((sum, item) => sum + item.amount, 0);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="text-sm text-blue-600 font-medium mb-1">Suma wydatków</p>
                <p className="text-2xl font-bold text-blue-900">${totalAmount.toFixed(2)}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <p className="text-sm text-green-600 font-medium mb-1">Wydatki jednorazowe</p>
                <p className="text-2xl font-bold text-green-900">${oneTimeAmount.toFixed(2)}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <p className="text-sm text-yellow-600 font-medium mb-1">Wydatki cykliczne</p>
                <p className="text-2xl font-bold text-yellow-900">${recurringAmount.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default ExpenseSummary;