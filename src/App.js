import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GeneralEntries from './components/GeneralEntries';
import './App.css'
import { useEffect, useState } from "react";
import LoadingModal from './components/Modals/LoadingModal';
import AddGeneralEntry from "./components/Modals/AddGeneralEntry";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(false);
  const [addingGE, setAddingGE] = useState(false);
  const [generalJournal, setGeneralJournal] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [tAccounts, setTAccounts] = useState([]);

  // const getAllTAccounts = async () => {
  //   try {
  //     const res = await axios.get(`http://localhost:5000/Ledger/`);
  //     console.log(res.data.data);
  //     return res.data.data
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // useEffect(()=>{
  //   setTAccounts(getAllTAccounts())
  // })

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/GeneralEntries"
            element={
              <GeneralEntries
                setAddingGE={setAddingGE}
                generalJournal={generalJournal}
                setGeneralJournal={setGeneralJournal}
                accounts={accounts}
                setAccounts={setAccounts}
              />
            }
          />
          <Route
            exact
            path="/Closing"
            element={<></>} />
          <Route path="/" element={<Navigate to="/GeneralEntries" />} />
        </Routes>
      </BrowserRouter>
      {loading ? <LoadingModal /> : null}
      {
        addingGE ?
          <AddGeneralEntry
            setGeneralJournal={setGeneralJournal}
            setLoading={setLoading}
            generalJournal={generalJournal}
            setAddingGE={setAddingGE}
            tAccounts={tAccounts}
            setTAccounts={setTAccounts}
          />
          : null
      }
    </div>
  );
}

export default App;
