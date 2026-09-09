import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {
  return (
    <Layout>
      <Toaster position="top-right" />
      <ExpenseForm />
      <ExpenseList />
    </Layout>
  );
}

export default App;