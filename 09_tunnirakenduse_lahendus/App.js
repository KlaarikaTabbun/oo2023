import { useEffect, useRef, useState } from 'react';
import './App.css';
//olekumuutujad ja viidete loomine
function App() {
  const [tooted, setTooted] = useState([]);
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const isActiveRef = useRef();

//käivitub komponendi laadimisel
  useEffect(() => {
    fetch("http://localhost:3000/tooted")//päring toodete saamiseks
      .then(res => res.json())
      .then(json => setTooted(json));//seadmine olekumuutujasse
  }, []);

  function kustuta(index) {
    fetch("http://localhost:3000/kustuta-toode/" + index, {"method": "DELETE"})
      .then(res => res.json())
      .then(json => setTooted(json));
  }

 
  function lisa() {
    const uusToode = {
      "id": idRef.current.value,
      "name": nameRef.current.value,
      "price": priceRef.current.value,
      "isActive": isActiveRef.current.value
    }
    fetch("http://localhost:4444/tooted/lisa", {"method": "POST", "body": JSON.stringify(uusToode)})
      .then(res => res.json())
      .then(json => setTooted(json));
  }
 

  function dollariteks() {
    const kurss = 1.1;
    fetch("http://localhost:4444/tooted/hind-dollaritesse/" + kurss, {"method": "PATCH"})
      .then(res => res.json())
      .then(json => setTooted(json));
  }
//komponendi renderdamine
  return (
    <div className="App">
      <label>ID</label> <br />
      <input ref={idRef} type="number" /> <br />
      <label>Nimi</label> <br />
      <input ref={nameRef} type="text" /> <br />
      <label>Hind</label> <br />
      <input ref={priceRef} type="number" /> <br />
      <label>Aktiivne</label> <br />
      <input ref={isActiveRef} type="checkbox" /> <br />
      <button onClick={() => lisa()}>Lisa</button>
      {tooted.map((toode, index) => 
        <div>
          <div>{toode.id}</div>
          <div>{toode.name}</div>
          <div>{toode.price}</div>
          <button onClick={() => kustuta(index)}>x</button>
        </div>)}
      <button onClick={() => dollariteks()}>Muuda dollariteks</button>
    </div>
  );
}

export default App;
