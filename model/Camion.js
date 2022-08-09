import Vehiculo from "./Vehiculo.js";

class Camion extends Vehiculo {

    // Constructor Atributos
    constructor(id,capacidadMaxima, placa, marca, color) {
        super(placa, marca, color);
        this.id = id;
        this.capacidadMaxima = capacidadMaxima;
    }

    // Polimorfismos    
    mostrarDatos() {
        return `${super.mostrarDatos()} con capacidadMaxima: ${this.capacidadMaxima} `;
    }

}


export default Camion;