const ServicosPrestados = require('../models/ServicosPrestados');

module.exports = class ServicosPrestadosController {
    //Cadastrar Serviço Prestado
    static async cadastrarservicoprestado(req, res) {
        try {
            const { refObra, servicoPrestado, valoraReceber, valoraPagar } = req.body;
            const newServicoPrestado = new ServicosPrestados({
                refObra,
                servicoPrestado,
                valoraReceber,
                valoraPagar,
            });
            await newServicoPrestado.save();
            res.status(200).json('Serviço cadastrado com sucesso!');
        } catch {
            res.status(200).json('Erro ao cadastrar serviço prestado!');
        }
    }

    //Ver Serviço Prestado
    static async servicoprestado(req, res) {
        try {
            const { id } = req.params;
            const servico = await ServicosPrestados.findById(id)
                .populate({
                    path: 'refObra',
                    select: 'refObra'
                })
                .populate({
                    path: 'servicoPrestado',
                    select: 'nomeServico',
                })
                .exec();
            res.status(200).json({ servico: servico })
        } catch (error) {
            console.error(error)
            res.status(404).json('Nenhum dado cadastrado!')
        }
    }

    //Ver serviço prestado por obra
    static async servicoprestadoobra(req, res) {
        try {
            const { refObra } = req.params;
            const getServicoPrestado = await ServicosPrestados.find({ refObra: refObra }).sort({ createdAt: -1 })
                .populate({
                    path: 'refObra',
                    select: 'refObra'
                })
                .populate({
                    path: 'servicoPrestado',
                    select: 'nomeServico',
                })
                .exec()
            res.status(200).json({ getServicoPrestado: getServicoPrestado });
        } catch {
            res.status(200).json('Erro ao buscar Serviços prestados');
        }
    }

    //Deleta Servico Prestado
    static async deletaservicoprestado(req, res) {
        try {
            const { id } = req.params;
            await ServicosPrestados.findByIdAndDelete(id);
            res.status(204).json({ message: "Item apagado com sucesso" });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error deleting item');
        }
    }
}