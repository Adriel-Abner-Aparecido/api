const NumerosObra = require("../models/NumerosObra");

module.exports = class NumerosObraController {
  //Cadastra numeros Obra
  static async cadastranumerosobra(req, res) {
    try {
      const { refObra, numeroBloco, numeroAndares, numeroUnidades } = req.body;

      const conferenumero = await NumerosObra.findOne({
        refObra: refObra,
        numeroBloco: numeroBloco,
      });

      if (conferenumero) {
        return res.status(400).json("Bloco ja cadastrado!");
      }

      const newNumerosObra = new NumerosObra({
        refObra,
        numeroBloco,
        numeroAndares,
        numeroUnidades,
      });

      await newNumerosObra.save();

      res.status(201).json({ message: "Dados cadastrados com Sucesso!" });
    } catch {
      res.status(500).json({ message: "Erro interno do servidor!" });
    }
  }

  //Ver numeros Obra
  static async numerosobra(req, res) {
    try {
      const { refObra } = req.params;
      const numeros = await NumerosObra.find({ refObra: refObra });
      res.json({ numerosObra: numeros });
    } catch (error) {
      res.status(500).json({ message: "Erro" });
    }
  }

  //apaga numeros Obra
  static async apaganumeros(req, res) {
    try {
      const { id } = req.params;
      const relbloco = await NumerosObra.findById(id);

      if (!relbloco) {
        return res.status(404).json("Bloco nao encontrado");
      }

      await NumerosObra.findByIdAndDelete(id);

      res.status(200).json("Bloco apagado com sucesso.");
    } catch (error) {
      res.status(500).json("Erro ao apagar item", error);
    }
  }
};
