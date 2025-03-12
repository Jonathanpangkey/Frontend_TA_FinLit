import React, {useState, useEffect} from "react";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

const steps = [
  "Tuliskan segala pengeluaran yang Anda lakukan setiap bulan",
  "Susun pengeluaran berdasarkan prioritas",
  "Jumlahkan semua pengeluaran",
  "Jumlahkan gaji, komisi, bonus, dll",
  "Bandingkan penghasilan dan pengeluaran",
  "Surplus atau defisit?",
];

const HandsonPractice = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [incomeEntries, setIncomeEntries] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [inputData, setInputData] = useState([]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [incomeSource, setIncomeSource] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");

  useEffect(() => {
    const savedData = localStorage.getItem("handsOnData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setExpenses(parsedData.expenses || []);
      setIncomeEntries(parsedData.incomeEntries || []);
      setInputData(parsedData.inputData || []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("handsOnData", JSON.stringify({expenses, incomeEntries, inputData}));
  }, [expenses, incomeEntries, inputData]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Step 1: Add Expense
  const addExpense = () => {
    if (expenseName && expenseAmount) {
      setExpenses([...expenses, {id: `expense-${expenses.length}`, name: expenseName, amount: parseFloat(expenseAmount)}]);
      setExpenseName("");
      setExpenseAmount("");
    }
  };

  // Step 1: Delete Expense
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  // Step 2: Drag-and-Drop for Prioritizing Expenses
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedExpenses = Array.from(expenses);
    const [removed] = reorderedExpenses.splice(result.source.index, 1);
    reorderedExpenses.splice(result.destination.index, 0, removed);
    setExpenses(reorderedExpenses);
  };

  // Step 3: Calculate total expenses
  useEffect(() => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setTotalExpenses(total);
  }, [expenses]);

  // Step 4: Add Income
  const addIncome = () => {
    if (incomeSource && incomeAmount) {
      setIncomeEntries([...incomeEntries, {id: `income-${incomeEntries.length}`, source: incomeSource, amount: parseFloat(incomeAmount)}]);
      setIncomeSource("");
      setIncomeAmount("");
    }
  };

  // Step 4: Delete Income
  const deleteIncome = (id) => {
    setIncomeEntries(incomeEntries.filter((income) => income.id !== id));
  };

  // Step 4: Calculate total income
  useEffect(() => {
    const total = incomeEntries.reduce((sum, income) => sum + income.amount, 0);
    setTotalIncome(total);
  }, [incomeEntries]);

  // Format number to Rupiah
  const formatRupiah = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className='hands-on-practice'>
      <h3>{`Langkah ${currentStep + 1}`}</h3>
      <p>{steps[currentStep]}</p>

      {/* Step 1: Add Expenses */}
      {currentStep === 0 && (
        <div>
          <input type='text' placeholder='Nama Pengeluaran' value={expenseName} onChange={(e) => setExpenseName(e.target.value)} />
          <input type='number' placeholder='Jumlah Pengeluaran' value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} />
          <button onClick={addExpense}>Tambahkan Pengeluaran</button>
          <ul className='financial-list'>
            {expenses.map((expense, index) => (
              <li key={index} className='expense'>
                {expense.name}: {formatRupiah(expense.amount)}
                <button onClick={() => deleteExpense(expense.id)}>x</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Step 2: Prioritize Expenses */}
      {currentStep === 1 && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='expenses'>
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef} className='financial-list'>
                {expenses.map((expense, index) => (
                  <Draggable key={expense.id} draggableId={expense.id} index={index}>
                    {(provided) => (
                      <li className='expense' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        {expense.name}: {formatRupiah(expense.amount)}
                        <button onClick={() => deleteExpense(expense.id)}>x</button>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}

      {/* Step 3: Sum expenses */}
      {currentStep === 2 && (
        <div>
          <h4>Total pengeluaran: {formatRupiah(totalExpenses)}</h4>
          <p>Pengeluaran Anda akan dihitung secara otomatis.</p>
        </div>
      )}

      {/* Step 4: Add and Sum Income */}
      {currentStep === 3 && (
        <div>
          <input type='text' placeholder='Sumber Penghasilan' value={incomeSource} onChange={(e) => setIncomeSource(e.target.value)} />
          <input type='number' placeholder='Jumlah Penghasilan' value={incomeAmount} onChange={(e) => setIncomeAmount(e.target.value)} />
          <button onClick={addIncome}>Tambahkan Penghasilan</button>
          <ul className='financial-list'>
            {incomeEntries.map((income, index) => (
              <li key={index} className='income'>
                {income.source}: {formatRupiah(income.amount)}
                <button onClick={() => deleteIncome(income.id)}>x</button>
              </li>
            ))}
          </ul>
          <h4>Total penghasilan: {formatRupiah(totalIncome)}</h4>
        </div>
      )}

      {/* Step 5: Compare Income and Expenses */}
      {currentStep === 4 && (
        <div>
          <p>
            Penghasilan: <span className='income'>{formatRupiah(totalIncome)}</span>
          </p>
          <p>
            Pengeluaran: <span className='expense'>-{formatRupiah(totalExpenses)}</span>
          </p>
          {totalIncome > totalExpenses ? <h4 className='income'>Status: Surplus!</h4> : <h4 className='expense'>Status: Defisit.</h4>}
        </div>
      )}

      {/* Step 6: Advice Based on Financial Condition */}
      {currentStep === 5 && (
        <div>
          {totalIncome > totalExpenses ? (
            <div>
              <p>Syukurlah surplus. Maka nilai surplus ini, harus mulai Anda sisihkan di awal untuk diinvestasikan.</p>
            </div>
          ) : (
            <div>
              <p>
                Waduh defisit, Anda wajib melakukan penghematan pengeluaran agar jumlah pengeluaran lebih kecil daripada jumlah penghasilan yang Anda
                terima:
              </p>
              <ul>
                <li>Jarangkan pos pengeluaran: Misalnya setiap minggu Anda menonton bioskop, maka sekarang lakukan setiap bulan.</li>
                <li>Turunkan pos pengeluaran: Misalnya setiap minggu minum kopi di kafe eksklusif, sekarang minum kopi di warung kopi.</li>
                <li>Tunda pos pengeluaran: Misalnya ingin berwisata ke Bali bulan depan, tunda menjadi tahun depan.</li>
                <li>
                  Hilangkan pos pengeluaran: Misalnya makanan yang mengandung kolesterol tinggi, hilangkan kebiasaan yang kurang baik agar badan tetap
                  sehat.
                </li>
              </ul>
              <p>
                Upayakan pengeluaran setiap bulan berada di bawah penghasilan, dan lakukan penyisihan sebesar minimum 10% dari jumlah penghasilan.
              </p>
              <p>
                Bila pengeluaran masih lebih besar daripada penghasilan, dan Anda telah melakukan langkah optimal, maka sekarang saatnya Anda
                berupaya:
              </p>
              <ul>
                <li>Mencari pekerjaan lain di hari Sabtu dan Minggu.</li>
                <li>Menjual harta/properti untuk melunasi utang yang berbunga tinggi yang membebani pengeluaran bulanan.</li>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Next and Previous Buttons */}
      <br />
      <div>
        {currentStep > 0 && <button onClick={handlePrevious}>Previous</button>}
        {currentStep < steps.length - 1 && (
          <button onClick={handleNext} disabled={currentStep === steps.length - 1}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default HandsonPractice;
