import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleExpenseAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <Layout>
      <Toaster position="top-right" />
      <ExpenseForm onExpenseAdded={handleExpenseAdded} />
      <ExpenseList key={refreshTrigger} />
    </Layout>
  );
}

export default App;