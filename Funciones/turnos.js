const registrarTurnoHTML=(e)=>{
    e.preventDefault()
    //fecha de hoy
    const hoy= new Date()
    //fecha de ayer(en el input la prop min excluye la fecha ingresada)
    hoy.setDate(hoy.getDate()+1)
    //lo convierto a un formato que me conviene para el input (aaaa/mm/ddTHora)
    //separo la fecha y la hora y tomo solo la fecha
    const mañana=hoy.toISOString().split('T')[0];
    const horarios=["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"]
    const turnos= JSON.parse(localStorage.getItem("turnos"));
    //guardo en horariosNoDisp los horarios que ya esten registrados en la fecha seleccionada
    
    
        
    document.getElementById('container').innerHTML=
    `<form>
        <label>DNI</label>
        <input id="DNI" type="number" required={true}/>
        <label>Fecha y hora: </label>
        <input min=${mañana} id="fecha" type="date" required={true}/>
        <label>Horario</label>
        <select id="horario" disabled={true} title="Debe seleccionar la fecha primero">
            
        </select>
        <label>Motivo</label>
        <select id='motivo'>
            <option>Asesoramiento</option>
            <option>Comprar</option>
        </select>
        <button onclick="registrarTurno(event)">Solicitar</button>
    </form>`
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
        const horariosNoDisp=turnos?.filter(t=>t.fecha===document.getElementById("fecha").value)
            .map(t=>t.horario)
        const horariosDisp=horarios.filter(h=>!horariosNoDisp?.includes(h))
            .map(h=>`<option value=${h}>${h}</option>`)
        
        document.getElementById('horario').innerHTML=horariosDisp;

    })
}

const registrarTurno=(e)=>{
    e.preventDefault()
    const turnos=JSON.parse(localStorage.getItem("turnos"));
    const turno={
        id:turnos.length?turnos[turnos.length-1].id + 1:1,
        DNI:document.getElementById("DNI").value,
        fecha:document.getElementById("fecha").value,
        horario:document.getElementById("horario").value,
        motivo:document.getElementById("motivo").value,
        estado:'Pendiente'  
    }
    turnos.push(turno)
    localStorage.setItem("turnos",JSON.stringify(turnos))
    //Elimino el contenido de los inputs para poder seguir con los registros 
    document.getElementById("DNI").value = '';
    document.getElementById("fecha").value = '';
    document.getElementById("horario").value = '';
    document.getElementById("motivo").value = '';
    alert("turno soliciitado!")
}
 