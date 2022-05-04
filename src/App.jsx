import { useState } from "react";

function App() {

  const [inputState, setInputState] = useState({
    titulo: "",
    fecha: "",
    nota: "",
  })  ;

  const initialState = JSON.parse(localStorage.getItem("notas")) || [];
  const [notas, setNotas] = useState(initialState)

  const handleInputChange = (event) => {
    setInputState({
      ...inputState,
      [event.target.name]: event.target.value,
    });

  };

  const handleResetClick = () =>{
    setInputState({
      ...inputState,
      titulo: "",
      fecha: "",
      nota: "",
    });
  }
  let arregloNotas = JSON.parse(localStorage.getItem("notas")) || [];

  const handleClickGuardar = () =>{
    setNotas([...notas, inputState]);
    localStorage.setItem("notas", JSON.stringify(notas));
    handleResetClick();
  };

  const handleBorrarNota = (index) => {
    const nuevoArreglo = []
    
    notas.forEach((nota, i) => {
      if (index !== i){
        nuevoArreglo.push(nota)
      }
    });

  localStorage.setItem("notas", JSON.stringify(nuevoArreglo));
  setNotas([...nuevoArreglo]);
   };
  return (
    <div>
    <div className="App container">
      <div className="row">
        <div className="col">
          <h3>Lista</h3>
        {
          arregloNotas.length === 0 ?
          "No tienes notas guardadas por el momento. Puedes crear una en el formulario"
          : (
            <ol>
            {arregloNotas.map((item, index) => {
              return (
               <li key={index}>
                {item.titulo}({item.fecha})&nbsp;
                <i className="bi bi-x-circle-fill" 
                onClick={() => handleBorrarNota(index)} 
                style={{color:"red", fontSize: "1rem", cursor: "pointer"}}></i>
                </li>
                );
              })}
          </ol>
          )
        }
        
        {
       /* arregloNotas.length !== 0 &&(
          <ol>
            {arregloNotas.map((item) => {
              return (
               <li>
                {item.titulo}({item.fecha})
                </li>
                );
              })}
          </ol>
        )
            */}
        </div>

        <div className="col">
        <h3>NOTAS</h3>
        <label className="mb-2" style={{ width:"100%" }}>
          Título 
          <input 
            id = "titulo" 
            name = "titulo" 
            type = "text" 
            onChange = {handleInputChange}
            value = {inputState.titulo}
            style={{ width:"100%" }}
        /></label>
        
        <br></br>
        <label className="mb-2" style={{ width:"100%" }}>
          Fecha
          <input 
            id = "fecha" 
            name = "fecha" 
            type = "date" 
            onChange = {handleInputChange}
            value = {inputState.fecha}
            style={{ width:"100%" }}
        /></label>
        
        <br></br>
        <label htmlfor = "nota" style={{ width:"100%" }}>
          Nota
          <textarea 
            id = "nota" 
            name = "nota" 
            onChange = {handleInputChange}
            value = {inputState.nota}
            style={{ width:"100%" }}
        /></label>
          <hr></hr>
          <div className="ms-2 me-2 mt-2 row">
      <div className="col">
        <span className="row me-1">
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleResetClick}
      >
        Limpiar
      </button>
      </span>
      </div>
      <div className="col">
        <span className="row ms-1">
        <button
        type="button"
        className="btn btn-primary"
        onClick={handleClickGuardar}
        >
         GUARDAR
        </button>
      </span>
      </div>
      </div>
        </div>
      </div>
    
    </div>
    </div>
  );
}

export default App;