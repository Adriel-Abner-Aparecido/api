const Etapas = require('../models/Etapas');

module.exports = class EtapasController {
    //Cadastrar etapas
    static async cadastraretapa(req, res) {
        try {
            const { nomeEtapa, refEtapa, tempoExecucao } = req.body;
            const newEtapa = new Etapas({
                nomeEtapa,
                refEtapa,
                tempoExecucao,
            });
            await newEtapa.save();
            res.status(201).json({ message: 'Etapa cadastrado com Sucesso!' });
        } catch {
            res.status(500).json({ message: 'Erro interno do servidor!' });
        }
    }

    //Ver etapas
    static async etapas(req, res) {
        try {
            const etapas = await Etapas.find().sort({ createdAt: -1 })
                .populate({
                    path: 'refEtapa',
                    select: 'nomeServico',
                })
                .exec();
            res.json({ etapas: etapas });
        } catch {
            res.status(500).json({ message: "Erro" });
        }
    }

    //Ver etapas pelo serviço
    static async etapasservico(req, res) {
        try {
            const { refEtapa } = req.params;
            const etapas = await Etapas.find({ refEtapa: refEtapa }).sort({ createdAt: -1 })
            res.status(200).json({ etapas: etapas })
        } catch {
            res.status(404).json('Nenhum dado cadastrado!')
        }
    }

    //Ver etapa
    static async etapa(req, res) {
        try {
            const { id } = req.params;
            const etapa = await Etapas.findById({ _id: id })
                .populate({
                    path: 'refEtapa',
                    select: 'nomeServico',
                })
                .exec();
            res.status(200).json({ etapa: etapa })
        } catch {
            res.status(404).json('Nenhum dado cadastrado!')
        }
    }

    //Atualiza Etapa
    static async atualizaetapa(req, res) {
        try {
            const { id } = req.params;
            const { nomeEtapa, refEtapa, tempoExecucao } = req.body;
            const atualizaEtapa = await Etapas.findById(id);

            if (!atualizaEtapa) {
                return res.status(404).json({ message: 'Entrega não encontrada' });
            }

            atualizaEtapa.nomeEtapa = nomeEtapa;
            atualizaEtapa.refEtapa = refEtapa;
            atualizaEtapa.tempoExecucao = tempoExecucao;

            await atualizaEtapa.save();
            res.status(200).json('Atualizado com Sucesso')
        } catch (error) {
            res.status(500).json('Erro', error)
        }
    }

    //Deleta etapa
    static async deletaetapa(req, res) {
        try {
            const { id } = req.params;
            const realservicoprestado = await EntregaServico.findOne({ etapaEntregue: id })

            if (realservicoprestado) {
                return res.json('Este item esta relacionado alguma entrega de serviço e não pode ser apagado!')
            }

            await Etapas.findByIdAndDelete((id));
            res.status(204).json({ message: "Item apagado com sucesso" });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error deleting item');
        }
    }
}