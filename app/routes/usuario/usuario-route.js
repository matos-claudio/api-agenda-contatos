const usuarioController = require('../../controllers/usuario/usuario-controller');

module.exports = (app) => {
    app.route('/ping').get(usuarioController.ping);

    app.route('/novo-usuario').post(usuarioController.novoUsuario);
    app.route('/login-usuario').post(usuarioController.loginUsuario);
    app.route('/atualizar-usuario/:_id').put(usuarioController.atualizarUsuario);
    app.route('/remover-usuario/:_id').delete(usuarioController.removerUsuario);

    // ============================ Rotas para o contato ==========================
    app.route('/novo-contato/:_id').put(usuarioController.novoContato);
    app.route('/atualizar-contato/:_id/:_idContato').put(usuarioController.atualizarContato);
};