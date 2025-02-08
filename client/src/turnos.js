const registrarTurnoHTML=async (e)=>{
    e.preventDefault()
    //fecha de hoy
    const hoy= new Date()
    //fecha de ayer(en el input la prop min excluye la fecha ingresada)
    hoy.setDate(hoy.getDate()+1)
    //lo convierto a un formato que me conviene para el input (aaaa/mm/ddTHora)
    //separo la fecha y la hora y tomo solo la fecha
    const mañana=hoy.toISOString().split('T')[0];
    const horarios=["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"]
    const response= await fetch(`http://localhost:3001/turnos`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    const turnos= await response.json()  
        
    document.getElementById('container').innerHTML=
    `<div>
        <button class="bi bi-arrow-90deg-left" onclick="window.inicio()"></button>
        <form>
            <label>DNI</label>
            <input id="DNI" type="number" required={true}/>
            <label>Fecha y hora: </label>
                <input min=${mañana} id="fecha" type="date" required={true}/>
            <label>Horario</label>
            <select id="horario" disabled={true} title="Debe seleccionar la fecha primero"></select>
            <label>Motivo</label>
            <select id='motivo'>
                <option>Asesoramiento</option>
                <option>Comprar</option>
            </select>
            <button onclick="registrarTurno(event)">Solicitar</button>
        </form>
    </div>`
    //si el usuario selecciona un sabado o un domingo salta un alert 
    document.getElementById('fecha').addEventListener('input', function(e){
        //getUTCDay devuelve un entero del 0 al 6.. siendo 0: Domingo y 6:Sabado
        const dia = new Date(this.value).getUTCDay();
        //si el dia seleccionado es un sabado o un domingo...
        if(dia===0 || dia ===6){
            //para que no se borre lo demas del formulario
            e.preventDefault();
            //elimino la seleccion
            this.value = '';
            alert('Fines de semana no disponibles!');
        }
    });
    //si el usuario selecciona una fecha se desbloquea la etiqueta select, para
    //seleccionar el horario deseado y se quita el title con el mensaje
    document.getElementById('fecha').addEventListener('change',()=>{
        const horario=document.getElementById('horario')
        horario.disabled = false;
        horario.title="";
        //filtro los horarios que no estan disponibles en la fecha selecionada por el usuario
        const horariosNoDisp=turnos?.filter(t=>t.fecha===document.getElementById("fecha").value)
            .map(t=>t.horario)
        //filtro de todos los horarios posibles, los que estan disponibles en la fecha seleccionada
        const horariosDisp=horarios.filter(h=>!horariosNoDisp?.includes(h))
            .map(h=>`<option value=${h}>${h}</option>`)
        
        document.getElementById('horario').innerHTML=horariosDisp;
    })
}

const registrarTurno=async(e)=>{
    e.preventDefault()
    const turno={
        DNI:document.getElementById("DNI").value,
        fecha:document.getElementById("fecha").value,
        horario:document.getElementById("horario").value,
        motivo:document.getElementById("motivo").value,
        estado:'Pendiente'  
    }
    const response=await fetch('http://localhost:3001/turnos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(turno)
})
    if(response.ok) {
      //Elimino el contenido de los inputs para poder seguir con los registros 
        window.inicio()
        alert("turno soliciitado!")
    }
   
}
 

const listarTurnos = async(e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3001/turnos`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        }
    )
    const turnos= await response.json();
    document.getElementById("container").innerHTML = turnos.length === 0
        ? `<div><h1>No hay turnos registrados</h1></div>`
        : turnos.map(t => `
            <div>
                <h2>DNI: ${t.DNI}</h2>
                <h2>Fecha: ${t.fecha}</h2>
                <h2>Horario: ${t.horario}</h2>
                <h2>Motivo: ${t.motivo}</h2>
                <h2>Estado: ${t.estado}</h2>
                <button style='background-color:red' onclick='eliminarTurno(${t.id})'>Eliminar</button>
                <button onclick='aceptarTurno(event,${t.id})'>Aceptar</button>
            </div>
        `).join('');
}

const aceptarTurno = async(e, id) => {
    e.preventDefault();
    const turno={
        estado:"Aceptado"
    }
    const response=await fetch(`http://localhost:3001/turnos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(turno)
    })
    if(response.ok) { 
        alert("Turno aceptado!")
        return listarTurnos(e);
    }
}

const eliminarTurno = async(id) => {
    await fetch(`http://localhost:3001/turnos/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    listarTurnos(new Event('click'))
}
