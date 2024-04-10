const EntregaServico = require('../models/Entregas');

module.exports = class EntregasController {
    //Cadastrar entregas
    static async entregaservico(req, res) {
        try {
            const { refUsuario, refObra, blocoObra, servicoObra, refServico, unidadeObra, etapaEntregue, statusEntrega, percentual } = req.body;
            const entregaServico = new EntregaServico({
                refUsuario,
                refObra,
                blocoObra,
                servicoObra,
                refServico,
                unidadeObra,
                etapaEntregue,
                statusEntrega,
                percentual,
            });
            await entregaServico.save()
            res.status(201).json({ message: "Serviço entregue" })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor!' });
        }
    }

    //Ver entregas
    static async entregas(req, res) {
        try {
            const entregas = await EntregaServico.find().sort({ createdAt: -1 })
                .populate({
                    path: 'refUsuario',
                    select: 'nomeCompleto',
                })
                .populate({
                    path: 'refObra',
                    select: 'nomeObra',
                })
                .populate({
                    path: 'blocoObra',
                    select: 'numeroBloco',
                })
                .populate({
                    path: 'servicoObra',
                    select: 'servicosPrestado',
                })
                .populate({
                    path: 'servicoObra',
                    select: 'valoraReceber',
                })
                .populate({
                    path: 'etapaEntregue',
                    select: 'nomeEtapa',
                })
                .exec();
            res.json({ entregaServico: entregas });
        } catch (err) {
            res.status(500).json({ message: "Erro", err });
        }
    }

    //Entregas do usuario
    static async entregasusuario(req, res) {
        try {
            const { refUsuario } = req.params;
            const entregas = await EntregaServico.find({ refUsuario: refUsuario }).sort({ createdAt: -1 })
                .populate({
                    path: 'refUsuario',
                    select: 'nomeCompleto',
                })
                .populate({
                    path: 'refObra',
                    select: 'nomeObra',
                })
                .populate({
                    path: 'blocoObra',
                    select: 'numeroBloco',
                })
                .populate({
                    path: 'servicoObra',
                    select: 'nomeServico',
                })
                .populate({
                    path: 'servicoObra',
                    select: 'valoraPagar',
                })
                .populate({
                    path: 'etapaEntregue',
                    select: 'nomeEtapa',
                })
                .exec();
            res.json({ entregaServico: entregas });
        } catch (error) {
            res.json({ message: "Erro" });
        }
    }

    //Entregas da Obra
    static async entregasobra(req, res) {
        try {
            const { refObra } = req.params;
            const entregas = await EntregaServico.find({ refObra: refObra }).sort({ createdAt: -1 })
                .populate({
                    path: 'refUsuario',
                    select: 'nomeCompleto',
                })
                .populate({
                    path: 'refObra',
                    select: 'nomeObra',
                })
                .populate({
                    path: 'blocoObra',
                    select: 'numeroBloco',
                })
                .populate({
                    path: 'servicoObra',
                    select: 'nomeServico',
                })
                .populate({
                    path: 'servicoObra',
                    select: 'valoraReceber'
                })
                .populate({
                    path: 'etapaEntregue',
                    select: 'nomeEtapa',
                })
                .exec();
            res.json({ entregaServico: entregas });
        } catch (err) {
            res.status(500).json({ message: "Erro", err });
        }
    }

    //Atualiza o status da entrega
    static async atualizastatus(req, res) {
        try {
            const { id } = req.params;
            const { statusEntrega } = req.body;

            const atualizaStatus = await EntregaServico.findById(id);

            if (!atualizaStatus) {
                return res.status(404).json({ message: 'Entrega não encontrada' });
            }

            atualizaStatus.statusEntrega = statusEntrega;
            await atualizaStatus.save();
            res.status(200).json({ message: 'Dados atualizados com sucesso' });
        } catch (error) {
            console.error('erro', error)
            res.status(500).json({ message: 'Erro ao atualizar a meta' });
        }
    }
}