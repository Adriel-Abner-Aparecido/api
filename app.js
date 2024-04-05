require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express()

//Config Json response
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())


//models
const User = require('./models/Users')

mongoose.connect(`${process.env.MONGODB_URL}`).then(() => {

  app.listen(3000)
  console.log("Conectou ao banco de dados!")
}).catch((err) => console.log(err))


app.post('/cadastro', async (req, res) => {
  try {

    const { nomeUsuario, nomeCompleto, emailUsuario, senhaUsuario, confirmaSenha, nivelUsuario, funcaoUsuario } = req.body;
    const existingUser = await User.findOne({ emailUsuario });

    if (!nomeUsuario) {
      return res.status(400).json({ message: 'Informe o nome de usuario' });
    }

    if (!nomeCompleto) {
      return res.status(400).json({ message: 'Informe o nome completo' });
    }

    if (!emailUsuario) {
      return res.status(400).json({ message: 'Informe o email' });
    }

    if (!senhaUsuario) {
      return res.status(400).json({ message: 'Informe a senha' });
    }

    if (confirmaSenha !== senhaUsuario) {
      return res.status(400).json({ Message: 'As senhas precisam ser iguais' });
    }

    if (existingUser) {
      return res.status(400).json({ message: 'Este email já está cadastrado.' });
    }

    const salt = bcrypt.genSaltSync(12)
    const passwordHash = bcrypt.hashSync(senhaUsuario, salt)

    // Cria um novo usuário
    const newUser = new User({
      nomeUsuario,
      nomeCompleto,
      emailUsuario,
      nivelUsuario,
      salt,
      senhaUsuario: passwordHash,
      confirmaSenha,
      funcaoUsuario,
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
app.get('/usuarios', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ users: users });
  } catch {
    res.status(500).json({ message: "Erro" });
  }
})

//get Usuario

app.get('/usuario/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await User.findById(id);
    res.json({ usuario: usuario });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Erro" });
  }
})

//Atualiza Usuario
app.put('/atualizaUsuario/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nomeUsuario, nomeCompleto, emailUsuario, nivelUsuario, funcaoUsuario, status } = req.body;

    const atualizaUsuario = await User.findById(id);
    if (!atualizaUsuario) {
      return res.status(404).json('Usuario não encontrado');
    }

    atualizaUsuario.nomeUsuario = nomeUsuario;
    atualizaUsuario.nomeCompleto = nomeCompleto;
    atualizaUsuario.emailUsuario = emailUsuario;
    atualizaUsuario.nivelUsuario = nivelUsuario;
    atualizaUsuario.funcaoUsuario = funcaoUsuario;
    atualizaUsuario.status = status;
    atualizaUsuario.save();
    res.status(200).json('Atualizado com sucesso')
  } catch {
    res.status(500).json('Erro interno do servidor!')
  }
})

//atualiza Senha
app.put('/atualizaSenha/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { senhaUsuario, confirmaSenha } = req.body;

    const atualizaUsuario = await User.findById(id);
    
    if (!atualizaUsuario) {
      return res.status(404).json('Usuario não encontrado');
    }

    if (senhaUsuario !== confirmaSenha) {
      return res.status(400).json('As senhas devem ser iguais!')
    }

    const salt = bcrypt.genSaltSync(12)
    const passwordHash = bcrypt.hashSync(senhaUsuario, salt)

    atualizaUsuario.salt = salt;
    atualizaUsuario.senhaUsuario = passwordHash;
    atualizaUsuario.save();
    res.status(200).json('Atualizado com sucesso')
  } catch {
    res.status(500).json('Erro interno do servidor!')
  }
})


//cadastro Obras
const Obra = require('./models/Obras')

app.post('/cadastroObras', async (req, res) => {
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
})

//Cadastro numero de Unidades

const NumerosObra = require('./models/NumerosObra')

app.post('/cadastroNumerosObra', async (req, res) => {
  try {
    const { refObra, numeroBloco, numeroAndares, numeroUnidades } = req.body;

    const conferenumero = await NumerosObra.findOne({ refObra: refObra, numeroBloco: numeroBloco })

    if (conferenumero) {
      return res.status(400).json('Bloco ja cadastrado!')
    }

    const newNumerosObra = new NumerosObra({
      refObra,
      numeroBloco,
      numeroAndares,
      numeroUnidades
    });

    await newNumerosObra.save();

    res.status(201).json({ message: 'Dados cadastrados com Sucesso!' });
  } catch {
    res.status(500).json({ message: 'Erro interno do servidor!' });
  }
})

//get Numeros obra
app.get('/numerosObra/:refObra', async (req, res) => {
  try {
    const { refObra } = req.params;
    const numeros = await NumerosObra.find({ refObra: refObra });
    res.json({ numerosObra: numeros });
  } catch (error) {
    res.status(500).json({ message: "Erro" });
  }
})

//Apaga bloco obra
app.delete('/deleteBloco/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const relbloco = await NumerosObra.findById(id);

    if (!relbloco) {
      return res.status(404).json('Bloco nao encontrado')
    }

    const deletebloco = await NumerosObra.findByIdAndDelete(id);
    res.status(200).json('Bloco apagado com sucesso.')
  } catch (error) {
    res.status(500).json('Erro ao apagar item', error)
  }
})


//get obras

app.get('/verObras', async (req, res) => {
  try {
    const obras = await Obra.find().sort({ createdAt: -1 });
    res.json({ obras: obras });
  } catch {
    res.status(500).json({ message: "Erro" });
  }
})

//Get Obra
app.get('/obra/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const obra = await Obra.findById(id);
    res.json({ obra: obra });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Erro" });
  }
})

//Atualiza Obra
app.put('/atualizaObra/:id', async (req, res) => {
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
})

const Servicos = require('./models/Servicos')

//Cadastro servico
app.post('/cadastroServico', async (req, res) => {
  try {
    const { nomeServico } = req.body;
    const newServicos = new Servicos({
      nomeServico,
    });
    console.log(req.body)
    await newServicos.save();
    res.status(201).json({ message: 'Serviço cadastrado com Sucesso!' });
  } catch {
    res.status(500).json({ message: 'Erro interno do servidor!' });
  }
})

//get servico
app.get('/servicos', async (req, res) => {
  try {
    const servicos = await Servicos.find().sort({ createdAt: -1 });
    res.json({ servicos: servicos });
  } catch {
    res.status(500).json({ message: "Erro" });
  }
})


//Pega servico pelo ID
app.get('/servico/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const servico = await Servicos.findById({ _id: id })
    res.status(200).json({ servico: servico })
  } catch (error) {
    res.status(500).json('Erro', error)
  }
})


//Atualiza Serviço
app.put('/atualizaServico/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nomeServico } = req.body;

    const atualizaServico = await Servicos.findById(id);

    if (!atualizaServico) {
      res.status(404).json('Servico nao encontrado!')
    }

    atualizaServico.nomeServico = nomeServico;
    atualizaServico.save()
    res.status(200).json('Serviço atualizado!')
  } catch (error) {
    res.status(500).json('Erro', error)
  }
})
//delete Servico

app.delete('/deleteServico/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const reletapa = await Etapas.findOne({ refEtapa: id });
    const realservicoprestado = await ServicosPrestados.findOne({ servicoPrestado: id });

    if (reletapa) {
      return res.json('Este item esta relacionado com alguma etapa, apague a etapa primeiro!');
    }

    if (realservicoprestado) {
      return res.json('Este item esta relacionado com alguma serviço prestado e nao pode ser apagado!');
    }

    await Servicos.findByIdAndDelete(id);
    res.status(204).json({ message: "Item apagado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json('Error deleting item');
  }
})

//Entrega Serviços

const EntregaServico = require('./models/Entregas');

app.post('/entregaServico', async (req, res) => {
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
})

//Get entregas Global

app.get('/entregas', async (req, res) => {
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
})

//Get Entregas por referencia

app.get('/entregaServico/:refUsuario', async (req, res) => {
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
})

//Get entregas por obra
app.get('/entregaServicoObra/:refObra', async (req, res) => {
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
})

//Atualiza Status do serviço
app.put('/atualizaStatusEntrega/:id', async (req, res) => {
  const { id } = req.params;
  const { statusEntrega } = req.body;

  try {
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
})

//servico prestado
const ServicosPrestados = require('./models/ServicosPrestados');

app.post('/servicoPrestado', async (req, res) => {
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
})

app.get('/servicoPrestado/:id', async (req, res) => {
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
})

//Get servico Prestado
app.get('/servicosPrestados/:refObra', async (req, res) => {
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
})


//Delete Servico
app.delete('/deleteServicoPrestado/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await ServicosPrestados.findByIdAndDelete(id);
    res.status(204).json({ message: "Item apagado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting item');
  }
})


//Etapas
const Etapas = require('./models/Etapas');

app.post('/cadastroEtapa', async (req, res) => {
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
})


//get etapas

app.get('/etapas', async (req, res) => {
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
})

//get etapas por id
app.get('/refEtapas/:refEtapa', async (req, res) => {
  try {
    const { refEtapa } = req.params;
    const etapas = await Etapas.find({ refEtapa: refEtapa }).sort({ createdAt: -1 })
    res.status(200).json({ etapas: etapas })
  } catch {
    res.status(404).json('Nenhum dado cadastrado!')
  }
})

//pega etapa pelo id
app.get('/refEtapa/:id', async (req, res) => {
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
})

//Atualiza Etapa
app.put('/atualizaEtapa/:id', async (req, res) => {
  const { id } = req.params;
  const { nomeEtapa, refEtapa, tempoExecucao } = req.body;

  try {
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
})

//delete etapas

app.delete('/deleteEtapa/:id', async (req, res) => {
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
})

//login usuarios


app.post('/login', async (req, res) => {

  const { nomeUsuario, senhaUsuario } = req.body
  const user = await User.findOne({ nomeUsuario: nomeUsuario });
  const passwordHash = bcrypt.hashSync(senhaUsuario, user.salt);

  if (!nomeUsuario) {
    return res.status(400).json({ message: 'Informe o nome de usuario' });
  }

  if (!senhaUsuario) {
    return res.status(400).json({ message: 'Informe a senha' });
  }

  if (!user) {
    return res.status(404).json({ message: 'Usuario nao encontrado' });
  }

  if (user.senhaUsuario !== passwordHash) {
    return res.status(404).json({ message: 'Senha incorreta!' })
  }

  if (user && bcrypt.compareSync(senhaUsuario, user.senhaUsuario, user.nomeUsuario)) {
    const usuario = {
      userId: user._id,
      nivel: user.nivelUsuario,
      userName: user.nomeUsuario,
      status: user.status
    }
    const token = jwt.sign(usuario, 'secreto', { expiresIn: '24h' });
    res.json({ token, nivelUsuario: usuario.nivel, userId: user._id, userName: user.nomeUsuario, status: user.status });
  }

})

//meta

const Meta = require('./models/meta')

app.post('/meta', async (req, res) => {
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
})

//get meta

app.get('/meta', async (req, res) => {
  try {
    const meta = await Meta.find().sort({ createdAt: -1 });
    res.json({ meta: meta });
  } catch {
    res.status(500).json({ message: "Erro" });
  }
})

//Atualiza meta

app.put('/meta/:id', async (req, res) => {
  const { id } = req.params;
  const { valorMeta, diasUteis, metaData } = req.body;

  try {
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
});

//meta obra

const MetaObra = require('./models/metaObra')

app.post('/metaObra', async (req, res) => {
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
})



app.get('/metaObra/:relObra', async (req, res) => {
  try {
    const { relObra } = req.params;
    const metaObra = await MetaObra.find({ relObra: relObra });
    res.status(200).json({ metaObra: metaObra });
  } catch {
    res.status(500).json({ message: 'Erro' })
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
    res.status(200).json({ message: 'Meta atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar a meta da obra:', error);
    res.status(500).json({ message: 'Erro ao atualizar a meta da obra' });
  }
});


//meta usuario

const MetaUser = require('./models/metaUser')

app.post('/metaUser', async (req, res) => {
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
})



app.get('/metaUser/:relUser', async (req, res) => {
  try {
    const { relUser } = req.params;
    const metauser = await MetaUser.find({ relUser: relUser });
    res.json({ metaUser: metauser });
  } catch {
    res.json({ message: 'Erro' })
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
    res.status(200).json({ message: 'Meta atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar a meta da obra:', error);
    res.status(500).json({ message: 'Erro ao atualizar a meta da obra' });
  }
});

//Config
const Avatar = require('./models/avatar');

// Configuração do multer para salvar arquivos na pasta 'imagens'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'imagens/');
  },
  filename: function (req, file, cb) {
    cb(null, req.body.userId + path.extname(file.originalname));
  }
});

// Função para filtrar os arquivos permitidos
const fileFilter = (req, file, cb) => {
  // Verifica se o arquivo é uma imagem
  if (!file.mimetype.startsWith('image/')) {
    // Rejeita o upload se não for uma imagem
    return cb(false);
  }
  // Aceita o upload se for uma imagem
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Rota para o upload de arquivos
app.post('/avatar', upload.single('file'), (req, res) => {
  const userId = req.body.userId;
  if (!req.file) {
    return res.status(400).json({ message: 'Por favor, forneça um arquivo Valido.' });
  }
  console.log(userId)
  // Faça algo com o filePath e userId, como salvar no banco de dados

  const newFileName = userId + path.extname(req.file.originalname);
  fs.renameSync(req.file.path, 'imagens/' + newFileName);

  res.status(200).json({ message: 'Arquivo enviado com sucesso.' });
});

// Servindo arquivos estáticos da pasta 'imagens'
app.use('/imagens', express.static(path.join(__dirname, 'imagens')));