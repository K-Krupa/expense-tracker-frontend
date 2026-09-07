import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import ExpenseForm from "./components/ExpenseForm";

function App() {
  return (
    <Layout>
      <Toaster position="top-right" />
      <ExpenseForm />
    </Layout>
  );
}

export default App;