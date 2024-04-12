async function listarProblemas() {
    const dados_tabela = document.getElementById("dados_tabela")
    apiUrl = 'http://127.0.0.1:80/getall'
    const response = await fetch(apiUrl)
    if (!response.ok) {
      alert('Chamados não foram feitos!')
    }
    else {
      const data = await response.json()
      for (const item of data) {
        
        const linha = document.createElement("tr")
        const id = document.createElement("td") 
        const nome = document.createElement("td")
        const cpf = document.createElement("td")
        const setor = document.createElement("td")
        const editar = document.createElement("td")
        const excluir = document.createElement("td")
  
        id.textContent = item.id
        nome.textContent = item.nome
        cpf.textContent = item.cpf
        setor.textContent = item.setor

        linha.appendChild(idx)
        linha.appendChild(nome)
        linha.appendChild(cpf)
        linha.appendChild(setor)
        linha.appendChild(editar)
        linha.appendChild(excluir)
  
        dados_tabela.appendChild(linha) //adiciona a linha como filha do elemento dados_tabela
      }
    }
  }

  async function editaProblema(cpf) {
    const urlEditar = `editar.html?cpf=${cpf}`
    window.location.href = urlEditar
  }
  
  async function editarProblema(cpf) {
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

  async function excluir(id){
    const apiUrl = 'http://127.0.0.1:80/deletar/' + id
    const response = await fetch(apiUrl,{method:'DELETE'})
  
    if (response.status == 200) {
      alert('Usuário deletado com sucesso!')
      window.location.href = "index.html"
      return true
    } else {
      alert('Falha ao excluir! Fale com o suporte')
      return false
    }
  }

  async function enviarDados(event) {
    event.preventDefault()
  
    const formData = new FormData(document.getElementById('formulario'))
    const response = await fetch('http://127.0.0.1:80/novo', {
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