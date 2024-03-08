require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const app = express()

//Config Json response
app.use(express.json())
app.use(cors())


//models
const User = require('./models/Users')

mongoose.connect(`mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@cluster0.7kg72rk.mongodb.net/Cluster0`).then(()=>{
    app.listen(3000) 
    console.log("Conectou ao banco de dados!")
}).catch((err)=> console.log(err))


app.post('/cadastro', async (req, res) => {
    try {
        
      const { nomeUsuario, nomeCompleto, emailUsuario, senhaUsuario, confirmaSenha, nivelUsuario } = req.body;
      const existingUser = await User.findOne({ emailUsuario });
  
      if(!nomeUsuario){
        return res.status(400).json({ message: 'Informe o nome de usuario'});
      }
  
      if(!nomeCompleto){
        return res.status(400).json({ message: 'Informe o nome completo'});
      }
  
      if(!emailUsuario){
        return res.status(400).json({ message: 'Informe o email'});
      }
  
      // if(!companyUsuario){
      //   return res.status(400).json({ message: 'Informe sua empresa'});
      // }
  
      if (!senhaUsuario){
        return res.status(400).json({ message: 'Informe a senha'});
      }
  
      if(confirmaSenha !== senhaUsuario){
        return res.status(400).json({ Message: 'As senhas precisam ser iguais'});
      }
  
      if (existingUser) {
        return res.status(400).json({ message: 'Este email já está cadastrado.' });
      }

      const salt= await bcrypt.genSaltSync(12)
      const passwordHash = await bcrypt.hashSync(senhaUsuario, salt)

      // Cria um novo usuário
      const newUser = new User({
        nomeUsuario,
        nomeCompleto,
        emailUsuario,
        nivelUsuario,
        salt,
        senhaUsuario: passwordHash,
        confirmaSenha,
      });
  
      // Salva o novo usuário no banco de dados
      await newUser.save();
      
      res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  });

  //get usuarios
  app.get('/usuarios', async(req, res)=>{
    try{
      const users = await User.find().sort({createdAt:-1});
      res.json({users: users});
    }  catch{
      res.status(500).json({message: "Erro"});
    }
  })

  //get Usuario

  app.get('/usuario/:id', async(req, res)=>{
    try{
      const {id} = req.params;
      const usuario = await User.findById(id);
      res.json({usuario: usuario});
    }  catch(error){
      console.error(error)
      res.status(500).json({message: "Erro"});
    }
  })


  //cadastro Obras
  const Obra = require('./models/Obras')

  app.post('/cadastroObras', async (req, res ) => {
    try{
      const { nomeObra, enderecoObra, cidadeObra, numeroRua, complementoObra, tipoObra, servicoPrestado, precoServico, descricaoObra } = req.body;

      const newObra = new Obra({
        nomeObra,
        enderecoObra,
        cidadeObra,
        numeroRua,
        complementoObra,
        tipoObra,
        servicoPrestado,
        precoServico,
        descricaoObra,
      });

      await newObra.save();
      res.json({id: newObra._id});
    } catch {
      res.status(500).json({message: 'Erro interno do servidor!'});
    }
  })

  //Cadastro numero de Unidades

  const NumerosObra = require('./models/NumerosObra')

  app.post('/cadastroNumerosObra', async (req, res ) => {
    try{
      const { relObra, numeroBloco, numeroAndares, numeroUnidades } = req.body;

      const newNumerosObra = new NumerosObra({
        relObra,
        numeroBloco,
        numeroAndares,
        numeroUnidades
      });

      await newNumerosObra.save();

      res.status(201).json({message: 'Dados cadastrados com Sucesso!'});
    } catch {
      res.status(500).json({message: 'Erro interno do servidor!'});
    }
  })


  //get obras

  app.get('/verObras', async (req, res)=>{
    try{
      const obras = await Obra.find().sort({createdAt:-1});
      res.json({obras: obras});
    } catch{
      res.status(500).json({message: "Erro"});
    }
  })

  //Get Obra
  app.get('/obra/:id', async(req, res)=>{
    try{
      const {id} = req.params;
      const obra = await Obra.findById(id);
      res.json({obra: obra});
    }  catch(error){
      console.error(error)
      res.status(500).json({message: "Erro"});
    }
  })

  const Servico = require('./models/Servicos')

  //Cadastro servico
  app.post('/cadastroServico', async (req, res)=>{
    try{
      const {nomeServico} = req.body;
      const newServico = new Servico({
        nomeServico,
      });
      await newServico.save();
      res.status(201).json({message: 'Serviço cadastrado com Sucesso!'});
    } catch{
      res.status(500).json({message: 'Erro interno do servidor!'});
    }
  })

  //get servico
  app.get('/servicos', async(req, res)=>{
    try{
      const servicos = await Servico.find().sort({createdAt:-1});
      res.json({servicos: servicos});
    }  catch{
      res.status(500).json({message: "Erro"});
    }
  })

//delete Servico

  app.delete('/deleteServico/:id', async(req, res)=>{
    try {
      const {id} = req.params;
      await Servico.findByIdAndDelete((id));
      res.status(204).json({message: "Item apagado com sucesso"});
    } catch (error) {
      console.error(error);
      res.status(500).send('Error deleting item');
    }
  })

  //Entrega Serviços

  const EntregaServico = require('./models/Entregas');

  app.post('/entregaServico', async(req, res)=>{
    try{
      const {refUsuario, refObra, nomeUsuario, nomeObra, etapaEntregue, statusEntrega} = req.body;
      
      const entregaServico = new EntregaServico({
        refUsuario,
        refObra,
        nomeUsuario,
        nomeObra,
        etapaEntregue,
        statusEntrega,
      });
      await entregaServico.save()
      res.status(201).json({message: "Serviço entregue"})
    } catch(error){
      console.error(error);
      res.status(500).json({message: 'Erro interno do servidor!'});
    }
  })

  //Get Entregas por referencia

  app.get('/entregaServico/:refUsuario', async(req, res)=>{
    try{
      const {refUsuario} = req.params;
      const entregas = await EntregaServico.find({refUsuario: refUsuario}).sort({createdAt: -1});
      res.json({ entregaServico: entregas });
    } catch(error){
      res.status(500).json({message: "Erro"});
    }
  })

  //Get entregas por obra
  app.get('/entregaServicoObra/:refObra', async(req, res)=>{
    try{
      const {refObra} = req.params;
      const entregas = await EntregaServico.find({refObra: refObra}).sort({createdAt: -1});
      res.json({ entregaServico: entregas });
    } catch(error){
      res.status(500).json({message: "Erro"});
    }
  })


  //Etapas
  const Etapas = require('./models/Etapas');

  app.post('/cadastroEtapa', async (req, res)=>{
    try{
      const {nomeEtapa, relEtapa} = req.body;
      const newEtapa = new Etapas({
        nomeEtapa,
        relEtapa,
      });
      await newEtapa.save();
      res.status(201).json({message: 'Etapa cadastrado com Sucesso!'});
    } catch{
      res.status(500).json({message: 'Erro interno do servidor!'});
    }
  })


  //get etapas

  app.get('/etapas', async(req, res)=>{
    try{
      const etapas = await Etapas.find().sort({createdAt:-1});
      res.json({etapas: etapas});
    }  catch{
      res.status(500).json({message: "Erro"});
    }
  })

  //delete etapas

  app.delete('/deleteEtapa/:id', async(req, res)=>{
    try {
      const {id} = req.params;
      await Etapas.findByIdAndDelete((id));
      res.status(204).json({message: "Item apagado com sucesso"});
    } catch (error) {
      console.error(error);
      res.status(500).send('Error deleting item');
    }
  })

  //login usuarios


  app.post('/login', async (req,res)=>{

    const {nomeUsuario, senhaUsuario} = req.body
    const user = await User.findOne({ nomeUsuario: nomeUsuario });
    const passwordHash = bcrypt.hashSync(senhaUsuario, user.salt);
    
    if(!nomeUsuario){
        return res.status(400).json({ message: 'Informe o nome de usuario'});
      }

    if (!senhaUsuario){
        return res.status(400).json({ message: 'Informe a senha'});
    }
    
    if (!user){
        return res.status(404).json({ message: 'Usuario nao encontrado'});
    }

    if (user.senhaUsuario !== passwordHash){
      return res.status(404).json({message: 'Senha incorreta!'})
    }

    if (user && bcrypt.compareSync(senhaUsuario, user.senhaUsuario, user.nomeUsuario)){
      const usuario = {
        userId: user._id,
        nivel: user.nivelUsuario,
        userName: user.nivelUsuario,
      }
      const token = jwt.sign(usuario, 'secreto', { expiresIn: '24h' });
      res.json({token, nivelUsuario: usuario.nivel, userId: user._id, userName: user.nomeUsuario});
    }

  })

  //meta obra

  const MetaObra = require('./models/metaObra')

  app.post('/metaObra', async (req, res)=>{
    try{
      const {valorMeta, relObra} = req.body;
      const newMetaObra = new MetaObra({
        valorMeta,
        relObra,
      });
      await newMetaObra.save();
      res.status(201).json({message: 'Meta cadastrado com Sucesso!'});
    }catch{
      res.status(500).json({message: 'Erro!'});
    }
  })



  app.get('/metaObra/:relObra', async (req,res)=>{
    try{
      const {relObra} = req.params;
      const metaobra = await MetaObra.find({relObra: relObra});
      res.json({ metaObra: metaobra });
    }catch{
      res.json({message: 'Erro'})
    }
  })

  
  app.put('/metaObra/:id', async (req, res) => {
    const { id } = req.params;
    const { valorMeta } = req.body;
  
    try {
      const metaObra = await MetaObra.findById(id);
      if (!metaObra) {
        return res.status(404).json({ message: 'Meta não encontrada' });
      }
      metaObra.valorMeta = valorMeta;
      await metaObra.save();
      res.status(200).json({ message: 'Meta atualizada com sucesso'});
    } catch (error) {
      console.error('Erro ao atualizar a meta da obra:', error);
      res.status(500).json({ message: 'Erro ao atualizar a meta da obra' });
    }
  });


  //meta usuario

  const MetaUser = require('./models/metaUser')

  app.post('/metaUser', async (req, res)=>{
    try{
      const { valorMeta, relUser } = req.body;
      const newMetaUser = new MetaUser({
        valorMeta,
        relUser,
      });
      await newMetaUser.save();
      res.status(201).json({message: 'Meta cadastrado com Sucesso!'});
    }catch{
      res.status(500).json({message: 'Erro!'});
    }
  })



  app.get('/metaUser/:relUser', async (req,res)=>{
    try{
      const {relUser} = req.params;
      const metauser = await MetaUser.find({relUser: relUser});
      res.json({ metaUser: metauser });
    }catch{
      res.json({message: 'Erro'})
    }
  })

  
  app.put('/metaUser/:id', async (req, res) => {
    const { id } = req.params;
    const { valorMeta } = req.body;
  
    try {
      const metaUser = await MetaUser.findById(id);
      if (!metaUser) {
        return res.status(404).json({ message: 'Meta não encontrada' });
      }
      metaUser.valorMeta = valorMeta;
      await metaUser.save();
      res.status(200).json({ message: 'Meta atualizada com sucesso'});
    } catch (error) {
      console.error('Erro ao atualizar a meta da obra:', error);
      res.status(500).json({ message: 'Erro ao atualizar a meta da obra' });
    }
  });