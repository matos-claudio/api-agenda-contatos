const Usuario = require('../../models/agenda/usuario-model');
const { formatarResposta } = require('../../utils/response-util');

exports.novoUsuario = async (req, res) => {
    const { nomeUsuario, dadosUsuario } = req.body;
    if(!nomeUsuario || !dadosUsuario || !dadosUsuario.emailUsuario || !dadosUsuario.senhaUsuario) {
        res.send(formatarResposta(null, 'Todos os campos são obrigatórios', 500));
    }

    try {
        const usuario = new Usuario(req.body);
        const usuarioCriado = await usuario.save();
        res.send(formatarResposta(usuarioCriado, 'Usuário criado com sucesso', 200));
    } catch (error) {
        res.status(500).send(formatarResposta(null, 'Erro o atualizar contato', 500));
    }
};

exports.atualizarUsuario = async (req, res) => {
    //recuperar o id enviado via parametro
    const _id  = req.params._id;
    const { nomeUsuario, dadosUsuario } = req.body;
    
    if(!nomeUsuario || !dadosUsuario || !dadosUsuario.emailUsuario || !dadosUsuario.senhaUsuario) {
        res.status(500).send(formatarResposta(null, 'Todos os campos são obrigatórios', 500));
    }

    const usuarioAtualizado = await Usuario.findOneAndUpdate({ _id }, req.body, { new: true });
    usuarioAtualizado ? res.send(formatarResposta(usuarioAtualizado, 'Usuario atualizado!!!', 200)) : res.status(404).send(formatarResposta(null, 'Usuário não encontrado!!!', 404));
};

exports.loginUsuario = async (req, res) => {
    const { emailUsuario, senhaUsuario } = req.body;
    if (!emailUsuario || !senhaUsuario) {
        res.status(500).send(formatarResposta(null, 'Todos os campos são obrigatórios', 500));
    }

    try {
        const usuario = await Usuario.findOne({ 'dadosUsuario.emailUsuario': emailUsuario, 'dadosUsuario.senhaUsuario': senhaUsuario });
        usuario ? res.send(formatarResposta(usuario, 'Login realizado!!!', 200)) : res.status(404).send(formatarResposta(null, 'Usuário não encontrado!!!', 404));
    } catch (error) {
        res.status(500).send(formatarResposta(null, 'Erro o atualizar contato', 500));
    }
};

exports.removerUsuario = async (req, res) => {
    const _idUsuario = req.params._id;
    try {
        const usuario = await Usuario.findOneAndRemove({ _id: _idUsuario });
        usuario ? res.send(formatarResposta(null, 'Usuario removido!!!', 200)) : res.status(404).send(formatarResposta(null, 'Usuário não encontrado!!!', 404));
    } catch (error) {
        res.status(500).send(formatarResposta(null, 'Erro o atualizar contato', 500));
    }
};


exports.novoContato = async (req, res) => {
    const _idUsuario = req.params._id;
    if(!_idUsuario || _idUsuario == '' ) {
        res.send(formatarResposta(null, 'Não foi possível idenfiticar o usuário', 500));
    }
    const { nomeContato, emailContato, telefoneContato } = req.body;
    if(!nomeContato || nomeContato == '' || !emailContato || emailContato == '' || !telefoneContato || telefoneContato == '') {
        res.status(500).send(formatarResposta(null, 'Preencha todos os campos', 500));
    }
    try {
        // buscar o usuario na base de dados
        const usuario = await Usuario.findOne({ _id: _idUsuario });
        if(usuario) {
            usuario.contatosUsuario.push(req.body);
            const usuarioAtualizado = await usuario.save();
            res.send(formatarResposta(usuarioAtualizado, 'Contato criado com sucesso', 200));
        } else {
            res.status(500).send(formatarResposta(null, 'Usuário não encontrado!!!', 404));
        }
    } catch (error) {
        res.status(500).send(formatarResposta(null, 'Erro o atualizar contato', 500));
    }
};

exports.atualizarContato = async (req, res) => {
    const _idUsuario = req.params._id;
    const _idContato = req.params._idContato;
    if(!_idUsuario || _idUsuario == '' ) {
        res.status(500).send(formatarResposta(null, 'Não foi possível idenfiticar o usuário', 500));
    }

    const { nomeContato, emailContato, telefoneContato } = req.body;
    if(!nomeContato || nomeContato == '' || !emailContato || emailContato == '' || !telefoneContato || telefoneContato == '') {
        res.status(500).send(formatarResposta(null, 'Preencha todos os campos', 500));
    }

    try {
        const contatoAtualizado = await Usuario.findOneAndUpdate({ _id: _idUsuario, contatosUsuario: {$elemMatch: { _id: _idContato }}},
            {$set: {'contatosUsuario.$.nomeContato': nomeContato,
                    'contatosUsuario.$.emailContato': emailContato, 
                    'contatosUsuario.$.telefoneContato': telefoneContato }},
            { 'new': true });

        res.send(formatarResposta(contatoAtualizado, 'Contato atualizado com sucesso', 200));
    } catch (error) {
        res.status(500).send(formatarResposta(null, 'Erro o atualizar contato', 500));
    }
};

//remover contato fica por conta do pessoal