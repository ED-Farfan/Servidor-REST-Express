const { Router } = require("express");


const router = Router();
const fs = require("fs");  
//const Departamento = []
const json_Departamento = fs.readFileSync("src/public/Departamento.json","utf-8");

const Departamento = JSON.parse(json_Departamento)

//require("../Empleado.json");
router.get("/Departamento", (req, res) => {
  res.json(Departamento);
});
router.post("/Departamento/agregar", (req, res) => {   
  const { id_departamento, Nombre} = req.body;
  if (id_departamento && Nombre) {
    const comp = Departamento.find((element) => element.id_departamento == id_departamento);    
    if (comp) {
        res.json({
            error: true,
            msg: "El ID :"+id_departamento+" Esta ocupado por "+ comp.Nombre
          });
    } else {          
          
          let data = {"id_departamento":id_departamento,"Nombre":Nombre}      
          Departamento.push(data)
          const registro_json2 = JSON.stringify(Departamento,null, 2)      
          fs.writeFileSync("src/public/Departamento.json", registro_json2,"utf-8");       
          res.json({
            error: false,
            msg: "Se registro "+Nombre+ "con ID: "+id_departamento+""
          });
    }
  } else {
    let text = "Falta: ";
    text +=
      (id_departamento ? "" : "id_departamento, ") +
      (Nombre ? "" : "Nombre ")       

    res.json({
      error: true,
      msg: text
    });
  }
});


router.delete("/Departamento/eliminar", (req, res) => {
  const { id_departamento} = req.body;
  if (id_departamento) {
    const comp = Departamento.find((element) => element.id_departamento == id_departamento);
    let b = Departamento.indexOf(comp);    
    if (b) {
      Departamento.splice(b,1);
      const asistencia_json = JSON.stringify(Departamento,null, 2)      
      fs.writeFileSync("src/public/Departamento.json", asistencia_json,"utf-8");
      res.json({        
        error: false,
        msg: "Se Elimino a "+comp.id_departamento
      });
    } else {
      res.json({
        error: true,
        msg:"No existe ID: "+id_departamento
      });
    }
  } else {
    res.json({
      error: true,
      msg:"Envie el parametro id_departamento"
    });
  }
});



module.exports = router;