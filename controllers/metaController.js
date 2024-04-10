const Meta = require('../models/meta');
const MetaObra = require('../models/metaObra');
const MetaUser = require('../models/metaUser');

module.exports = class MetaController {
    //Cadastrar meta
    static async cadastrarmeta(req, res) {
        try {
            const { valorMeta, diasUteis, metaData } = req.body;
            const newMeta = new Meta({
                valorMeta,
                diasUteis,
                metaData,
            });
            await newMeta.save();
            res.status(201).json({ message: 'Meta definida com sucesso!' });
        } catch {
            res.status(500).json({ message: 'Falha ao definir meta!' });
        }
    }

    //Ver meta
    static async metas(req, res) {
        try {
            const meta = await Meta.find().sort({ createdAt: -1 });
            res.json({ meta: meta });
        } catch {
            res.status(500).json({ message: "Erro" });
        }
    }

    //Ver meta
    static async meta(req, res) {
        try {
            const {id} = req.body;

            const meta = await Meta.findById(id);
            
            res.json({ meta: meta });
        } catch {
            res.status(500).json({ message: "Erro" });
        }
    }

    //Atualiza Meta
    static async atualizameta(req, res) {
        try {
            const { id } = req.params;
            const { valorMeta, diasUteis, metaData } = req.body;

            const atualizaMeta = await Meta.findById(id);
            if (!atualizaMeta) {
                return res.status(404).json({ message: 'Meta não encontrada' });
            }
            atualizaMeta.valorMeta = valorMeta;
            atualizaMeta.diasUteis = diasUteis;
            atualizaMeta.metaData = metaData;
            await atualizaMeta.save();
            res.status(200).json({ message: 'Meta atualizada com sucesso' });
        } catch (error) {
            console.error('Erro ao atualizar a meta', error);
            res.status(500).json({ message: 'Erro ao atualizar a meta' });
        }
    }

    //Cadastra meta da obra
    static async cadastrarmetaobra(req, res) {
        try {
            const { valorMeta, relObra } = req.body;
            const newMetaObra = new MetaObra({
                valorMeta,
                relObra,
            });
            await newMetaObra.save();
            res.status(201).json({ message: 'Meta cadastrado com Sucesso!' });
        } catch {
            res.status(500).json({ message: 'Erro!' });
        }
    }

    //Ver meta da Obra
    static async metaobra(req, res) {
        try {
            const { relObra } = req.params;
            const metaObra = await MetaObra.find({ relObra: relObra });
            res.status(200).json({ metaObra: metaObra });
        } catch {
            res.status(500).json({ message: 'Erro' })
        }
    }

    //Atualiza meta da Obra
    static async atualizametaobra(req, res) {
        const { id } = req.params;
        const { valorMeta } = req.body;

        try {
            const metaObra = await MetaObra.findById(id);
            if (!metaObra) {
                return res.status(404).json({ message: 'Meta não encontrada' });
            }
            metaObra.valorMeta = valorMeta;
            await metaObra.save();
            res.status(200).json({ message: 'Meta atualizada com sucesso' });
        } catch (error) {
            console.error('Erro ao atualizar a meta da obra:', error);
            res.status(500).json({ message: 'Erro ao atualizar a meta da obra' });
        }
    }

    //Cadastrar Meta Usuario
    static async cadastrarmetausuario(req, res) {
        try {
            const { valorMeta, relUser } = req.body;
            const newMetaUser = new MetaUser({
                valorMeta,
                relUser,
            });
            await newMetaUser.save();
            res.status(201).json({ message: 'Meta cadastrado com Sucesso!' });
        } catch {
            res.status(500).json({ message: 'Erro!' });
        }
    }

    //Ver meta do usuario
    static async metausuario(req, res) {
        try {
            const { relUser } = req.params;
            const metauser = await MetaUser.find({ relUser: relUser });
            res.json({ metaUser: metauser });
        } catch {
            res.json({ message: 'Erro' })
        }
    }

    //Atualizar meta do usuario
    static async atualizametausuario(req, res) {
        const { id } = req.params;
        const { valorMeta } = req.body;

        try {
            const metaUser = await MetaUser.findById(id);
            if (!metaUser) {
                return res.status(404).json({ message: 'Meta não encontrada' });
            }
            metaUser.valorMeta = valorMeta;
            await metaUser.save();
            res.status(200).json({ message: 'Meta atualizada com sucesso' });
        } catch (error) {
            console.error('Erro ao atualizar a meta da obra:', error);
            res.status(500).json({ message: 'Erro ao atualizar a meta da obra' });
        }
    }
}