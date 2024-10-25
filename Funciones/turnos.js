const registrarTurnoHTML=(e)=>{
    e.preventDefault()
    const horarios=["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"]
    const turnos= JSON.parse(localStorage.getItem("turnos"));
    //guardo en horariosNoDisp los horarios que ya esten registrados en la fecha seleccionada
    const horariosNoDisp = turnos?.filter(t=>t.fecha===document.getElementById("fecha").value)
        .map(t=>t.horario)

    const horariosDisponibles=horarios.filter(h=>!horariosNoDisp?.includes(h))
        .map(h=>`<option value=${h}>${h}</option>`)
    
    const fechaActual=new Date()

    document.getElementById('container').innerHTML=
    `<form>
        <label>DNI</label>
        <input id="DNI" type="text" required={true}/>
        <label>Fecha y hora: </label>
        <input min="" id="fecha" type="date" required={true}/>
        <label>Horario</label>
        <select id="horario">
            ${horariosDisponibles}
        </select>
        <label>Motivo</label>
        <input id="motivo" type="text" required={true}/>
        <label>Estado</label>
        <input id="estado" type="text" required={true}/>
        <button onclick="registrarTurno(event)">Solicitar</button>
    </form>`
}

const registrarTurno=()=>{
    e.preventDefault()
    const turnos=JSON.parse(localStorage.getItem("turnos"));
    const turno={
        id:turnos.length+1,
        DNI:document.getElementById("DNI").value,
        fecha:document.getElementById("fecha").value,
        horario:document.getElementById("horario").value,
        motivo:document.getElementById("motivo").value,
        estado:document.getElementById("estado").value  
    }
    turnos.push(turno)
    localStorage.setItem("turnos",JSON.stringify(turnos))
    //Elimino el contenido de los inputs para poder seguir con los registros 
    document.getElementById("DNI").value = '';
    document.getElementById("fecha").value = '';
    document.getElementById("horario").value = '';
    document.getElementById("motivo").value = '';
    document.getElementById("estado").value = '';
    alert("turno soliciitado!")
}