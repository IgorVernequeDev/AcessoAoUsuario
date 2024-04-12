async function listarProblemas() {
    const dados_tabela = document.getElementById("dados_tabela")
    apiUrl = 'http://127.0.0.1/getall'
    const response = await fetch(apiUrl)
  
    if (!response.ok) {
      alert('Chamados não foram feitos!')
    }
    else {
      const data = await response.json()
      for (const item of data) {
        
        const linha = document.createElement("tr") //cria uma nova linha
        const id = document.createElement("td") //cria uma nova coluna
        const nome = document.createElement("td")
        const reclamacao = document.createElement("td")
        const editar = document.createElement("td")
        const excluir = document.createElement("td")
  
        id.textContent = item.id
        nome.textContent = item.nome
        reclamacao.textContent = item.reclamacao
  
  
        editar.innerHTML = `<button onclick='editaUsuario(${item.cpf})'>Editar</button>`
        excluir.innerHTML = `<button onclick='excluir(${item.id})'>Excluir</button>`
  
        linha.appendChild(id) //adiciona a coluna id como filha do elemento de linha
        linha.appendChild(nome)
        linha.appendChild(reclamacao)
        linha.appendChild(editar)
        linha.appendChild(excluir)
  
        dados_tabela.appendChild(linha) //adiciona a linha como filha do elemento dados_tabela
      }
    }
  }
  
  async function enviarDados(event) {
    event.preventDefault()
  
    const formData = new FormData(document.getElementById('formulario'))
    const response = await fetch('http://127.0.0.1/novo', {
      method: 'POST',
      body: formData
    })
  
    if (response.status == 201) {
      alert('Chamado feito com sucesso!')
      window.location.href = "index.html"
      return true
    } else {
      alert('Falha ao fazer o chamado! Fale com o suporte')
      return false
    }
  }
  // editaUsuario(cpf): Esta função é chamada quando o usuário seleciona a opção de editar um usuário. Ela redireciona o usuário para uma página de edição com o CPF do usuário como parâmetro na URL.
  
  async function editaUsuario(cpf) {
    const urlEditar = `edicao.html?cpf=${cpf}`
    window.location.href = urlEditar //permite redirecionar o navegador para o URL fornecido
  }
  
  // editarUsuario(cpf): Esta função é responsável por preencher um formulário de edição com os dados de um usuário existente. Ela faz uma solicitação à API para obter os dados do usuário com o CPF fornecido.
  
  async function editarUsuario(cpf) {
    try {
      const cpf_usuario = cpf
      const apiUrl = 'http://127.0.0.1/' + cpf_usuario
      const response = await fetch(apiUrl)
  
      if (!response.ok) {
        alert('Usuário não encontrado!')
      }
      else {
        const data = await response.json()
        const nome = data.nome
        const cpf = data.cpf
        const id = data.id
  
        document.getElementById("nome").value = nome
        document.getElementById("cpf").value = cpf
        document.getElementById("id").value = id
      }
    }
    catch (error) {
      console.error("API com problemas!")
    }
  }
  
  // alterarDados(event): Esta função é chamada quando os dados de um usuário são alterados em um formulário de edição. Ela envia os dados atualizados para a API através de uma solicitação PUT para atualizar o usuário.
  
  async function alterarDados(event){
    event.preventDefault() 
  
    const id = document.getElementById("id").value
    const apiUrl = 'http://127.0.0.1/editar/' + id
    const formData = new FormData(document.getElementById('formulario'))
    const response = await fetch(apiUrl, {
      method: 'PUT',
      body: formData
    })
  
    if (response.status == 201) {
      alert('Usuário alterado com sucesso!')
      window.location.href = "gestao.html"
      return true
    } else {
      alert('Falha ao alterar! Fale com o suporte')
      return false
    }
  }
  
  // excluir(id): Esta função é chamada quando um usuário é excluído. Ela envia uma solicitação à API para excluir o usuário com o ID fornecido.
  
  async function excluir(id){
    const apiUrl = 'http://127.0.0.1/deletar/' + id
    const response = await fetch(apiUrl,{method:'DELETE'})
  
    if (response.status == 200) {
      alert('Usuário deletado com sucesso!')
      window.location.href = "gestao.html"
      return true
    } else {
      alert('Falha ao excluir! Fale com o suporte')
      return false
    }
  }