import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [adjustDiv, setAdjustdiv] = useState()
  const [colorDiv, setAdjustcolor] = useState("black")
  const [sizeDiv, setAdjustsize] = useState("50px")
  const [setDiv, setShowdiv] = useState()

  return (
    <div style={{ padding: "30px" }}>
      <div style={{
        width: "100%",
        display: "flex",
        justifyContent: adjustDiv,

      }}>
{setDiv && 

        <div style={{ width: sizeDiv, height: sizeDiv, backgroundColor:colorDiv }}> </div>
}
      </div>
      
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px",marginTop:"10px" }}>
        <button onClick={() => setAdjustdiv("flex-start")}>left</button>
        <button onClick={() => setAdjustdiv("center")}>center</button>
        <button onClick={() => setAdjustdiv("flex-end")}>right</button>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => setAdjustcolor("red")}>red</button>
        <button onClick={() => setAdjustcolor("blue")}>blue</button>
        <button onClick={() => setAdjustcolor("yellow")}>yellow</button>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => setAdjustsize("100px")}>100px</button>
        <button onClick={() => setAdjustsize("200px")}>200px</button>
        <button onClick={() => setAdjustsize("300px")}>300px</button>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={()=>setShowdiv(true)}>Show</button>
        <button onClick={()=>setShowdiv(false)}>Hidden</button>
      </div>

    </div>


  );
}

export default App;
