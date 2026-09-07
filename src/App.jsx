import Layout from "./components/Layout";

function App() {
  return (
    <Layout>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Witaj w aplikacji!</h2>
        <p className="text-gray-600">Tutaj niedługo pojawi się formularz dodawania wydatków. </p>
      </div>
    </Layout>
  );
}

export default App;