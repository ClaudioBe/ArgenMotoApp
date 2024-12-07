const hashPassword=()=> { 
    const password='admin';
    let hash = 0; 
    for (let i = 0; i < password.length; i++) { 
        //guardo en char el codigo ascii de i(cada caracter de la contraseña)
        const char = password.charCodeAt(i); 
        //le asigno a hash, la mitad de su valor mas el codigo ascii de el caracter actual
        hash = hash/2 + char;
    } 
    return hash.toString(16); 
} 