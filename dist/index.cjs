var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.js
var import_express = __toESM(require("express"), 1);

// src/user.js
var import_mongoose = __toESM(require("mongoose"), 1);
var userSchema = new import_mongoose.default.Schema({
  nome: {
    type: String
  },
  cep: {
    type: Number
  },
  telefone: {
    type: Number
  },
  endereco: {
    type: String
  },
  estado: {
    type: String
  },
  categoria: {
    type: String
  },
  img: {
    type: String
  }
});
var user_default = import_mongoose.default.model("User", userSchema);

// src/index.js
var import_multer = __toESM(require("multer"), 1);
var import_cors = __toESM(require("cors"), 1);
var import_path = __toESM(require("path"), 1);
var import_mongoose2 = __toESM(require("mongoose"), 1);
var import_url = require("url");
var import_meta = {};
var __filename = (0, import_url.fileURLToPath)(import_meta.url);
var __dirname = import_path.default.dirname(__filename);
var app = (0, import_express.default)();
var port = process.env.PORT || 3001;
var data = (/* @__PURE__ */ new Date()).getTime();
var url = "mongodb+srv://dados:ZeOWIzee7yBJOEp9@cluster0.f1egadi.mongodb.net/?retryWrites=true&w=majority";
import_mongoose2.default.connect(url).then(() => console.log("Mongoose conectou")).catch(() => console.log("Mongoose n\xE3o conectou"));
var storage = import_multer.default.diskStorage({
  destination: (req, file, callback) => {
    callback(null, import_path.default.resolve("./imgs/"));
  },
  filename: (req, file, callback) => {
    let nameImg2 = `${data}_${file.originalname}`;
    callback(null, nameImg2);
  }
});
var upload = (0, import_multer.default)({ storage });
app.use((0, import_cors.default)());
app.use("/imgEs", import_express.default.static(import_path.default.resolve(__dirname, "imgs")));
app.use(import_express.default.json());
app.post("/uploadImg", upload.single("image"), (req, res) => {
  const mensagem = "Foto arquivada";
  return res.json(mensagem);
});
app.post("/register", async (req, res) => {
  const { nome } = await req.body;
  const { cep } = req.body;
  const { telefone } = req.body;
  const { endereco } = req.body;
  const { estado } = req.body;
  const { categoria } = req.body;
  const { imgName } = await req.body;
  console.log(imgName);
  const img2 = `${data}_${imgName}`;
  const obj = {
    nome,
    cep,
    telefone,
    endereco,
    estado,
    categoria,
    img: img2
  };
  const newUser = user_default.create(obj);
  return res.json(newUser);
});
app.get("/keys", (req, res) => {
  const chaves = [
    { chave: "16032011" }
  ];
  const jsonContent = JSON.stringify(chaves);
  res.end(jsonContent);
});
app.get("/getSQL", async (req, res) => {
  const parceiros = await user_default.find();
  return res.json(parceiros);
});
app.get("/", (req, res) => {
  const mensagem = "Hello World2";
  return res.json(mensagem);
});
var serverFun = () => {
  console.log("server rodando");
};
app.listen(port, serverFun);
