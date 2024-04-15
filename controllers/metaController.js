const Meta = require("../models/meta");
const MetaObra = require("../models/metaObra");
const MetaUser = require("../models/metaUser");

module.exports = class MetaController {
  //Cadastrar meta
  static async cadastrarmeta(req, res) {
    try {
      const { valorMeta, diasUteis, metaData } = req.body;

      const atualizaMeta = await Meta.findOne();

      if (atualizaMeta) {
        (atualizaMeta.valorMeta = valorMeta),
          (atualizaMeta.diasUteis = diasUteis),
          (atualizaMeta.metaData = metaData),
          await atualizaMeta.save();
      } else {
        const newMeta = new Meta({
          valorMeta,
          diasUteis,
          metaData,
        });
        await newMeta.save();
      }
      res.status(201).json({ message: "Meta definida com sucesso!" });
    } catch {
      res.status(500).json({ message: "Falha ao definir meta!" });
    }
  }

  //Ver meta
  static async metas(req, res) {
    try {
      const meta = await Meta.findOne();
      res.json({ meta: meta });
    } catch {
      res.status(500).json({ message: "Erro" });
    }
  }

  //Ver meta
  static async meta(req, res) {
    try {
      const { id } = req.body;

      const meta = await Meta.findById(id);

      res.json({ meta: meta });
    } catch {
      res.status(500).json({ message: "Erro" });
    }
  }

  //Cadastra meta da obra
  static async cadastrarmetaobra(req, res) {
    try {
      const { valorMeta, relObra } = req.body;

      const atualizaMeta = await MetaObra.findOne({ relObra: relObra });

      if (atualizaMeta) {
        atualizaMeta.valorMeta = valorMeta;
        await atualizaMeta.save();
      } else {
        const newMetaObra = new MetaObra({
          valorMeta,
          relObra,
        });
        await newMetaObra.save();
      }
      res.status(201).json({ message: "Meta cadastrado com Sucesso!" });
    } catch {
      res.status(500).json({ message: "Erro!" });
    }
  }

  //Ver meta da Obra
  static async metaobra(req, res) {
    try {
      const { relObra } = req.params;
      const metaObra = await MetaObra.findOne({ relObra: relObra });
      res.status(200).json({ metaObra: metaObra });
    } catch {
      res.status(500).json({ message: "Erro" });
    }
  }

  //Cadastrar Meta Usuario
  static async cadastrarmetausuario(req, res) {
    try {
      const { valorMeta, relUser } = req.body;

      const atualizaMeta = await MetaUser.findOne({ relUser: relUser });

      if (atualizaMeta) {
        atualizaMeta.valorMeta = valorMeta;
        await atualizaMeta.save();
      } else {
        const newMetaUser = new MetaUser({
          valorMeta,
          relUser,
        });
        await newMetaUser.save();
      }

      res.status(201).json({ message: "Meta cadastrado com Sucesso!" });
    } catch {
      res.status(500).json({ message: "Erro!" });
    }
  }

  //Ver meta do usuario
  static async metausuario(req, res) {
    try {
      const { relUser } = req.params;
      const metauser = await MetaUser.findOne({ relUser: relUser });
      res.json({ metaUser: metauser });
    } catch {
      res.json({ message: "Erro" });
    }
  }
};
