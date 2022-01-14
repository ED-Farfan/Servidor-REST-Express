const { Router } = require("express");


const router = Router();
const fs = require("fs");  
//const asistencia = []
const json_Registro = fs.readFileSync("src/public/Registro.json","utf-8");

const asistencia = JSON.parse(json_Registro)

//require("../Empleado.json");
router.get("/asistencia", (req, res) => {
  res.json(asistencia);
});
router.post("/asistencia/agregar", (req, res) => {   
  const { No_Empleado, Hora, Fecha, Tipo} = req.body;
  if (No_Empleado && Hora && Fecha && Tipo) {
    const json_Usuarios = fs.readFileSync("src/public/Empleado.json","utf-8");
    const usuarios = JSON.parse(json_Usuarios);
    const comp = usuarios.find((element) => element.No_Empleado == No_Empleado);    
    if (comp) {
        const u = []
        u.length
        const id = asistencia.length
        const id_ex = asistencia.find((element) => element.ID == id);
        while (id_ex == id) {
          id ++;
        }
        let data = {"ID":id,"No_Empleado":No_Empleado,"Hora":Hora, "Fecha":Fecha, "Tipo":Tipo}      
        asistencia.push(data)
        const registro_json2 = JSON.stringify(asistencia,null, 2)      
        fs.writeFileSync("src/public/Registro.json", registro_json2,"utf-8");       
        res.json({
          error: false,
          msg: "Registro Agregada con ID: "+id+""
        });
    } else {
        res.json({
            error: true,
            msg: "No se encontro No_Empleado: "+No_Empleado
          });
    }
  } else {
    let text = "Falta: ";
    text +=
      (No_Empleado ? "" : "No_Empleado, ") +
      (Hora ? "" : "Hora, ") +
      (Fecha ? "" : "Fecha, ")

    res.json({
      error: true,
      msg: text
    });
  }
});


router.delete("/asistencia/eliminar", (req, res) => {
  const { ID} = req.body;
  if (ID) {
    const comp = asistencia.find((element) => element.ID == ID);
    let b = asistencia.indexOf(comp);    
    if (b) {
      asistencia.splice(b,1);
      const asistencia_json = JSON.stringify(asistencia,null, 2)      
      fs.writeFileSync("src/public/Registro.json", asistencia_json,"utf-8");
      res.json({        
        error: false,
        msg: "Se Elimino a "+comp.ID
      });
    } else {
      res.json({
        error: true,
        msg:"No existe ID: "+ID
      });
    }
  } else {
    res.json({
      error: true,
      msg:"Envie el parametro ID"
    });
  }
});



module.exports = router;