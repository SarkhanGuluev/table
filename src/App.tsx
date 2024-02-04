import "./styles.css";
import tableStore from "./store/tableStore";
import Table from "./components/Table";

const App = () => {
  return (
    <div className="App">
      <Table tableStore={tableStore} />
    </div>
  );
};

export default App;
