const SERVER = 'http://localhost:3333'

document.getElementById('action').addEventListener('change', function () {
    const valueInput = document.getElementById('value')
    valueInput.style.display = this.value === 'delete' ? 'none' : 'block'
})

async function enviar() {
    const action = document.getElementById('action').value
    const key = document.getElementById('key').value.trim()
    const value = document.getElementById('value').value.trim()

    if (!key) {
        mostrarResposta('Preencha o campo chave!', 'error')
        return
    }

    const body = { action, key }

    if (action !== 'delete') {
        body.value = value
    }

    try {
        const response = await fetch(`${SERVER}/document`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })

        const data = await response.json()

        if (data.status === 'ok') {
            mostrarResposta('Operação realizada com sucesso!', 'ok')
            document.getElementById('key').value = ''
            document.getElementById('value').value = ''
        } else {
            const mensagens = {
                6: 'Erro: chave já existe!',
                2: 'Erro: chave não existe para atualizar!',
                3: 'Erro: chave não existe para deletar!',
                1: 'Erro: ação inválida!'
            }
            mostrarResposta(mensagens[data.code] || 'Erro desconhecido', 'error')
        }

        carregarDados()

    } catch (err) {
        mostrarResposta('Não foi possível conectar ao servidor!', 'error')
    }
}

function mostrarResposta(msg, tipo) {
    const el = document.getElementById('response')
    el.textContent = msg
    el.className = tipo
    el.style.display = 'block'
}

async function carregarDados() {
    try {
        const response = await fetch(`${SERVER}/document`)
        const data = await response.json()
        const tabela = document.getElementById('tabela')

        if (data.length === 0) {
            tabela.innerHTML = '<tr><td colspan="2" class="empty">Nenhum dado ainda.</td></tr>'
            return
        }

        tabela.innerHTML = data.map(item => `
            <tr>
                <td>${item.key}</td>
                <td>${item.value}</td>
            </tr>
        `).join('')

    } catch (err) {
        console.error('Erro ao carregar dados:', err)
    }
}

carregarDados()