from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

problemas = []

# Rota para listar todos os problemas
@app.route('/getall', methods=['GET'])
def lista_problemas():
    return jsonify(problemas)

# Rota para adicionar um novo problema
@app.route('/novo', methods=['POST'])
def add_problema():
    nome = request.form['nome']
    problema = (request.form['problema'])
    setor = request.form['setor']
    id = len(problemas) + 1
    novo_problema = {"id": id, "nome": nome, "problema": problema, "setor": setor}
    problemas.append(novo_problema)
    return jsonify({"message": "Usuário cadastrado"}), 201

@app.route('/status/<int:id>')
def edt_status(id):
  for problema in problemas:
    if problema['id'] == id:
      if problema['em espera'] == True:
        problema['em espera'] = False
      else:
        problema['em espera'] = True
  return jsonify({"message": "Status alterado"}), 201 
  
# Rota para alterar informações do usuário
@app.route('/editar/<int:id>', methods=['PUT'])
def alterar(id):
  nome = request.form['nome']
  problema = (request.form['problema'])
  for problema in problemas:
    if problema['id'] == id:
      problema['nome']= nome
      problema['problema']= problema
  return jsonify({"message": "Alterações realizadas"}), 201

# Rota para excluir um usuário
@app.route('/deletar/<int:id>', methods=['DELETE'])
def deletar_problema(id):
  for problema in problemas:
    if problema['id'] == id:
      problemas.remove(problema)
      return jsonify({'message': 'Chamado deletado com sucesso'}), 200
  else:
    return jsonify({'error': 'Chamado não encontrado'}), 404

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=80)