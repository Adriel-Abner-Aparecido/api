const Descontos = require("../models/descontos");

module.exports = class DescontosController {
  static async desconto(req, res) {
    try {
      const { relUser, descricao, valorDesconto } = req.body;

      const NewDesconto = new Descontos({
        relUser,
        descricao,
        valorDesconto,
      });

      await NewDesconto.save();

      res.status(200).json({ message: "Desconto cadastrado!" });
    } catch {
      res.status(500).json({ message: "Erro interno do servidor!" });
    }
  }

  static async descontos(req, res) {
    try {
      const { relUser } = req.params;

      const desconto = await Descontos.find({ relUser: relUser });

      res.status(200).json({ desconto: desconto });
    } catch {
      res.status(500).json({ message: "Erro interno do servidor!" });
    }
  }

  static async apagadesconto(req, res) {
    try {
      const { id } = req.params;

      const desconto = await Descontos.findById(id);

      if (!desconto) {
        res.status(404).json({ message: "Desconto não encontrado!" });
      }

      await Descontos.findByIdAndDelete(id);

      res.status(200).json({ message: "Desconto removido com sucesso" });
    } catch {
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
};
