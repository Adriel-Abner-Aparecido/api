const Servicos = require("../models/Servicos");
const ServicosPrestados = require("../models/ServicosPrestados");
const Etapas = require("../models/Etapas");

module.exports = class ServicosController {
  //Cadastra Servicos
  static async cadastrarservico(req, res) {
    try {
      const { nomeServico } = req.body;
      const newServicos = new Servicos({
        nomeServico,
      });
      await newServicos.save();
      res.status(201).json({ message: "Serviço cadastrado com Sucesso!" });
    } catch {
      res.status(500).json({ message: "Erro interno do servidor!" });
    }
  }

  //Ver serviços
  static async verservicos(req, res) {
    try {
      const servicos = await Servicos.find().sort({ createdAt: -1 });
      res.json({ servicos: servicos });
    } catch {
      res.status(500).json({ message: "Erro" });
    }
  }

  //Ver Serviço
  static async verservico(req, res) {
    try {
      const { id } = req.params;
      const servico = await Servicos.findById({ _id: id });
      res.status(200).json({ servico: servico });
    } catch (error) {
      res.status(500).json("Erro", error);
    }
  }

  //Atualiza serviço
  static async atualizaservico(req, res) {
    try {
      const { id } = req.params;
      const { nomeServico } = req.body;

      const atualizaServico = await Servicos.findById(id);

      if (!atualizaServico) {
        res.status(404).json("Servico nao encontrado!");
      }

      atualizaServico.nomeServico = nomeServico;
      atualizaServico.save();
      res.status(200).json("Serviço atualizado!");
    } catch (error) {
      res.status(500).json("Erro", error);
    }
  }

  //Deletar Serviço
  static async deletarservico(req, res) {
    try {
      const { id } = req.params;
      const reletapa = await Etapas.findOne({ refEtapa: id });
      const realservicoprestado = await ServicosPrestados.findOne({
        servicoPrestado: id,
      });

      if (reletapa) {
        return res.json(
          "Este item esta relacionado com alguma etapa, apague a etapa primeiro!"
        );
      }

      if (realservicoprestado) {
        return res.json(
          "Este item esta relacionado com alguma serviço prestado e nao pode ser apagado!"
        );
      }

      await Servicos.findByIdAndDelete(id);
      res.status(204).json({ message: "Item apagado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json("Error deleting item");
    }
  }
};
