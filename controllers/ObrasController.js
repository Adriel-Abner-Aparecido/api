const Obra = require('../models/Obras');

module.exports = class ObrasController {

    //Cadastrar Obras
    static async cadastoobras(req, res) {
        try {
            const { nomeObra, enderecoObra, cidadeObra, numeroRua, complementoObra, tipoObra, descricaoObra } = req.body;

            const newObra = new Obra({
                nomeObra,
                enderecoObra,
                cidadeObra,
                numeroRua,
                complementoObra,
                tipoObra,
                descricaoObra,
            });

            await newObra.save();
            res.json({ id: newObra._id });
        } catch {
            res.status(500).json({ message: 'Erro interno do servidor!' });
        }
    }

    //Ver Obras
    static async verobras(req, res) {
        try {
            const obras = await Obra.find().sort({ createdAt: -1 });
            res.json({ obras: obras });
        } catch {
            res.status(500).json({ message: "Erro" });
        }
    }

    //Ver Obra
    static async verobra(req, res) {
        try {
            const { id } = req.params;
            const obra = await Obra.findById(id);
            res.json({ obra: obra });
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: "Erro" });
        }
    }

    //Atualiza Obra
    static async atualizaobra(req, res) {
        try {
            const { id } = req.params;
            const { nomeObra, enderecoObra, cidadeObra, numeroRua, complementoObra, tipoObra, descricaoObra } = req.body;

            const atualizaObra = await Obra.findById(id);

            if (!atualizaObra) {
                return res.status(404).json('Obra não cadastrada')
            }

            atualizaObra.nomeObra = nomeObra;
            atualizaObra.enderecoObra = enderecoObra;
            atualizaObra.cidadeObra = cidadeObra;
            atualizaObra.numeroRua = numeroRua;
            atualizaObra.complementoObra = complementoObra;
            atualizaObra.tipoObra = tipoObra;
            atualizaObra.descricaoObra = descricaoObra;
            atualizaObra.save();
            res.status(200).json('Obra atualizada!')
        } catch (error) {
            res.status(500).json(error)
        }
    }
}