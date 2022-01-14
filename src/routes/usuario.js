const { Router } = require("express");


const router = Router();
const fs = require("fs");  
//const usuarios = []
const json_Usuarios = fs.readFileSync("src/public/Empleado.json","utf-8");

const usuarios = JSON.parse(json_Usuarios)

//require("../Empleado.json");
router.get("/usuarios", (req, res) => {
  res.json(usuarios);
});
router.post("/usuarios/login", (req, res) => {
  const { No_Empleado, pass } = req.body;
  if (No_Empleado) {
    const comp = usuarios.find((element) => element.No_Empleado == No_Empleado);
    if (comp) {
      res.json({
        error: !(comp.pass == pass)
      });
    } else {
      res.json({
        error: true
      });
    }
  } else {
    res.json({
      error: true
    });
  }
});

router.post("/usuarios/agregar", (req, res) => {
  const { No_Empleado, pass, Correo,Nombre,ApellidoP,ApellidoM } = req.body;
  if (No_Empleado && pass && Correo && Nombre && ApellidoP && ApellidoM) {
    const comp = usuarios.find((element) => element.No_Empleado == No_Empleado);
    if (comp) {
      res.json({
        error: true,
        msg: "No_Trabajador Existe"
      });
    } else {
      let data = {"No_Empleado":No_Empleado,"pass":pass,"Correo":Correo,"Nombre":Nombre , "ApellidoP":ApellidoP, "ApellidoM":ApellidoM}      
      usuarios.push(data)
      usuarios.forEach(element => {
          console.log(typeof(element));
      });
      
      const usuarios_json = JSON.stringify(usuarios,null, 2)      
      fs.writeFileSync("src/public/Empleado.json", usuarios_json,"utf-8");
      res.json({
        error: false,
        msg: "Agregado "
      });
      
    }
  } else {
    let text = "Falta: ";
    text +=
      (No_Empleado ? "" : "No_Empleado, ") +
      (pass ? "" : "pass, ") +
      (Correo ? "" : "Correo, ")+
      (Nombre ? "" : "Nombre, ")+
      (ApellidoP ? "" : "Apellido Paterno, ")+
      (Nombre ? "" : "Apellido Materno");

    res.json({
      error: true,
      msg: text
    });
  }
});
router.post("/usuarios/nombre-correo", (req, res) => {
  const { No_Empleado} = req.body;
  if (No_Empleado) {
    const comp = usuarios.find((element) => element.No_Empleado == No_Empleado);
    if (comp) {
      res.json({
        Nombre: comp.Nombre,
        Correo: comp.Correo,
        error: false
      });
    } else {
      res.json({
        error: true
      });
    }
  } else {
    res.json({
      error: true
    });
  }
});
router.post("/usuarios/Obtener_Datos", (req, res) => {
  const { No_Empleado} = req.body;
  if (No_Empleado) {
    const comp = usuarios.find((element) => element.No_Empleado == No_Empleado);
    if (comp) {
      res.json({
        Nombre: comp.Nombre,
        Correo: comp.Correo,
        pass: comp.Correo,
        error: false
      });
    } else {
      res.json({
        error: true,
        msg: "No existe No_Empleado: "+No_Empleado
      });
    }
  } else {
    res.json({
      error: true,
      msg:"Falto No_Empleado"
    });
  }
});

router.delete("/usuarios/eliminar", (req, res) => {
  const { No_Empleado} = req.body;
  if (No_Empleado) {
    const comp = usuarios.find((element) => element.No_Empleado == No_Empleado);
    let b = usuarios.indexOf(comp);    
    if (b) {
      usuarios.splice(b,1);
      const usuarios_json = JSON.stringify(usuarios,null, 2)            
      fs.writeFileSync("src/public/Empleado.json", usuarios_json,"utf-8");

      res.json({        
        error: false,
        msg: "Se Elimino a "+comp.Nombre
      });
    } else {
      res.json({
        error: true,
        msg:"No existe No_Empleado: "+No_Empleado
      });
    }
  } else {
    res.json({
      error: true,
      msg:"Envie el parametro No_Empleado"
    });
  }
});
//Math.random().toString(36).substring(0,10); 
router.put("/usuarios/Contrasenia-Temporal", (req, res) => {
  const { No_Empleado} = req.body;
  if (No_Empleado) {
    const comp = usuarios.find((element) => element.No_Empleado == No_Empleado);
    let b = usuarios.indexOf(comp);    
    if (b) {      
      comp.pass = Math.random().toString(36).substring(0,10);      
      const usuarios_json = JSON.stringify(usuarios,null, 2)      
      fs.writeFileSync("src/public/Empleado.json", usuarios_json,"utf-8");
      res.json({        
        error: false,
        msg: "Se Genero Contraseña De Recuperacion para"+comp.Nombre,
        npass: comp.pass
      });
    } else {
      res.json({
        error: true,
        msg:"No existe No_Empleado: "+No_Empleado
      });
    }
  } else {
    res.json({
      error: true,
      msg:"Envie el parametro No_Empleado"
    });
  }
});
router.put("/usuarios/Actualizar_Contrasenia_De_Temporal", (req, res) => {
  const { No_Empleado,pass, npass} = req.body;
  if (No_Empleado && pass && npass) {
    const comp = usuarios.find((element) => element.No_Empleado == No_Empleado && element.pass == pass);
    let b = usuarios.indexOf(comp);    
    if (b) {      
      comp.pass = npass;      
      const usuarios_json = JSON.stringify(usuarios,null, 2)      
      fs.writeFileSync("src/public/Empleado.json", usuarios_json,"utf-8");
      res.json({        
        error: false,
        msg: "Se Actualizo COntraseña para"+comp.Nombre
      });
    } else {
      res.json({
        error: true,
        msg:"Error em contraseña o No_Empleado"
      });
    }
  } else {
    res.json({
      error: true,
      msg:"Envie el parametro: "+(No_Empleado?"":"No_Empleado, ")+(pass?"":"pass, ")+(npass?"":"npass. ")
    });
  }
});
module.exports = router;
