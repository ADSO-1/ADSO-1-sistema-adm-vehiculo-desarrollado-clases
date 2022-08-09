//import bd_vehiculo from '../data/bd_vehiculo.js';
import { generarId } from '../helper/funciones.js'


// Modelo
import {bd_vehiculo} from "../js/index.js";
import Automovil from "../model/Automovil.js";
import Moto from "../model/Moto.js";
import Camion from "../model/Camion.js";


export const sincronizarStorage = (bd_vehiculo) => {
    localStorage.setItem("bd_vehiculo", JSON.stringify(bd_vehiculo));
    limpiarHTML('#listado-vehiculo');
    location.reload();
}

export const addVehiculo = (vehiculo) => {
    bd_vehiculo.push(vehiculo);
    sincronizarStorage(bd_vehiculo);
}

export const validarFormulario = (inf)  => {

    let vehiculo;

    const placa = document.querySelector("#placa").value;
    const marca = document.querySelector("#marca").value;
    const color = document.querySelector("#color").value;

    if([placa, marca, color, inf.value].includes("")){
        mostrarAlerta("Todos los campos son obligatorios", true);
        return;
    };

    mostrarAlerta("Datos guardados correctamente");

    if(inf.id === "num-puerta"){
        let id = generarId();
        vehiculo = new Automovil(id, inf.value,placa, marca, color);
        addVehiculo(vehiculo);
    }
    
    if(inf.id === "num-llantas"){
        let id = generarId();
        vehiculo = new Moto(id, inf.value,placa, marca, color);
        addVehiculo(vehiculo);
    }

    if(inf.id === "capacidad-max"){
        let id = generarId();
        vehiculo = new Camion(id, inf.value,placa, marca, color);
        console.log(vehiculo);
        addVehiculo(vehiculo);
    }

}

export const findAll = () => {
    //sincronizarStorage(bd_vehiculo);
    limpiarHTML('#listado-vehiculo');
    if(bd_vehiculo.length > 0)  {
        for (const vehiculo of bd_vehiculo) {
                const listadoVehiculos = document.querySelector('#listado-vehiculo');
                if(listadoVehiculos){
                    listadoVehiculos.innerHTML += `
                                        <tr>
                                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <p class="text-gray-600 font-bold"> ${vehiculo.placa} </p>
                                            </td>
                                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                                                <p class="text-gray-600">${vehiculo.marca}</p>
                                            </td>
                                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-600">    
                                                <p class="text-gray-600">${vehiculo.color}</p>
                                            </td>
                                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                                                <p class="text-gray-600">${vehiculo.color}</p>
                                            </td>
                                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                                                <a id="editar" href="editar-contacto.html?id=${vehiculo.id}" data-vehiculo="${vehiculo.id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                                                <a id="eliminar" href="#" data-vehiculo="${vehiculo.id}" class="eliminar text-red-600 hover:text-red-900">Eliminar</a>
                                            </td>
                                        </tr>
                                    `;
                }
        };
        // Asignar el evento click acada registro de contactos para eliminarlo
        addEventListenerEliminar();
    }else{
        mostrarAlerta("No hay vehiculos", true);
        return;
    }    
    //findAll();
};

const addEventListenerEliminar = () => {
    const eliminarBtn = document.querySelectorAll("#eliminar");
    eliminarBtn.forEach((vehiculo) =>{
        vehiculo.addEventListener("click",eliminarVehiculo);
    });
}; 

const eliminarVehiculo = (e) => {
    const confir = confirm("¿Quiere eliminar el Contacto?");
    const id = e.target.dataset.vehiculo;
    if(confir){
        limpiarHTML('#listado-vehiculo');
        //console.log('eliminar vehiculo ID = ', id);
        //bd_vehiculo.forEach(function(vehiculo){  console.log(vehiculo.id); });
        sincronizarStorage(bd_vehiculo.filter( vehiculo => vehiculo.id !== id ));
    }else{
        return;
    };
};

export const limpiarHTML = (listado) => {
    const listadoVehiculos = document.querySelector(`${listado}`);
    if(listadoVehiculos){
        while(listadoVehiculos.firstChild){
            listadoVehiculos.removeChild(listadoVehiculos.firstChild);
        };
    };
};

export const mostrarAlerta = (mensaje, error = null) => {
    const respuesta = document.querySelector('#resultados');
    const alerta = document.createElement('p');
    alerta.textContent = mensaje;
    if(error){
        alerta.classList.add('error');
    }else{
        alerta.classList.add('correcto');
    };
    respuesta.appendChild(alerta);
    setTimeout(() => {
        alerta.remove();
    }, 3000);
};

export default {
    addVehiculo,
    validarFormulario,
    findAll,
    limpiarHTML
} 