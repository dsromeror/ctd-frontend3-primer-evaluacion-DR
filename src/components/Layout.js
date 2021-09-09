import data from "./data";
import React from "react";
import Opciones from "./Opciones";
import Recordatorio from "./Recordatorio";

const historial = [];

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contador: 0,
      seleccionPrevia: "",
    };
  }

  componentDidUpdate(prevState) {
    if (prevState.contador !== this.state.contador) {
      historial.push(this.state.seleccionPrevia);
    }
  }

  handleClick = (e) => {
    if (this.state.contador >= 4) {
      alert("Fin.");
    }else{
      this.setState({
        contador: this.state.contador + 1,
        seleccionPrevia: e.target.id,
      });
    }
  };


  render() {
    const dataR = data.find(e => e.id === (this.state.contador + 1 + this.state.seleccionPrevia.toLowerCase()));
    return (
      <div className="layout">
        <h1 className="historia">{dataR.historia}</h1>

        <Opciones
          handleClick={this.handleClick}
          opcionA={dataR.opciones.a}
          opcionB={dataR.opciones.b}
        />
        
        <Recordatorio
          seleccionPrevia={this.state.seleccionPrevia}
          historial={historial.map(
            (e, index) => (
              <li key={index}>{e}</li>
            ),
            data[this.state.contador].id
          )}
        />

      </div>
    );
  }
}

export default Layout;
