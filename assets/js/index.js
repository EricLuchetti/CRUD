function getMensagens() {
    try {
        let mensagens = localStorage.getItem('mensagens') ? JSON.parse(localStorage.getItem('mensagens')) : [];

        return mensagens;
    } catch (error) {
        console.error('ERROR: ', error.message);
    }
}

function findIndexMensagemByEmail() {
    try {
        let mensagens = getMensagens();

        return mensagens.findIndex((data) => data.email === document.getElementById('email').value);
    } catch (error) {
        console.error('ERROR: ', error.message);
    }
}

function setDataMensagem() {
    try {
        let nome = document.getElementById('nome').value;
        let email = document.getElementById('email').value;
        let mensagem = document.getElementById('mensagem').value;

        let dados = {
            nome: nome,
            email: email,
            mensagem: mensagem
        }

        return dados;
    } catch (error) {
        console.error('ERROR: ', error.message);
    }
}

function validate() { 
    try {
        let nome = document.getElementById('nome').value;
        let email = document.getElementById('email').value;
        let mensagem = document.getElementById('mensagem').value;

        if(!nome) {
            throw new Error('Nome não pode ser vazio');
        }

        if(!email) {
            throw new Error('Email não pode ser vazio');
        }

        if(email.indexOf("@")== -1) {
            throw new Error('Email inválido');
        }

        if(email.indexOf(".com")== -1) {
            throw new Error('Email inválido');
        }

        if(email.length<10) {
            throw new Error('Email inválido');
        }

        if(!mensagem) {
            throw new Error('Mensagem não pode ser vazio');
        }

        return true;
    }catch (error) {
        alert(error.message);
    }
}

/*
function filtrar() {
const mensagens = localStorage.getItem('mensagens') ? JSON.parse(localStorage.getItem('mensagens')) : [];
}
*/

function filtrar() {
    try {

        let mensagens = getMensagens();
        let busca = document.getElementById('busca').value;

        const filtro = mensagens.filter((data) => {
            return data.nome.includes(busca) || data.email.includes(busca);
        });

        if (filtro == '') {
            alert('Não encontrado.')
        }

        let retorno = ``;
        let index = 0;

        for (let item of mensagens = filtro) {
            retorno += `
            <div class="col-md-3">
                <div class="card">
                    <div class="card-body">
                    <h5 class="card-title">${item.nome}</h5>
                    <p class="card-text">${item.email}</p>
                    <p class="card-text">${item.mensagem}</p>
                    <button onclick="loadDataUpdate(${index})" class="btn btn-warning">Alterar</button>
                    <button onclick="deleted(${index})" class="btn btn-danger">Excluir</button>
                    </div>
                </div>
            </div>`;
        }

        document.getElementById('lista').innerHTML = retorno;

        console.log(filtro);

    } catch(error) {
        alert(error.message);
    }
}



function create() {
    try {
        let dados = setDataMensagem();
        let mensagens = getMensagens();
        mensagens.push(dados);

        if(validate()) {
            localStorage.setItem('mensagens', JSON.stringify(mensagens));
            limparForm();
        }

        read();
    } catch (error) {
        console.error('ERROR: ', error.message);
    }
}

function read() {
    try {
        let mensagens = getMensagens();

        let retorno = ``;
        let index = 0;

        for (let item of mensagens) {
            retorno += `
            <div class="col-md-3">
                <div class="card">
                    <div class="card-body">
                    <h5 class="card-title">${item.nome}</h5>
                    <p class="card-text">${item.email}</p>
                    <p class="card-text">${item.mensagem}</p>
                    <button onclick="loadDataUpdate(${index})" class="btn btn-warning">Alterar</button>
                    <button onclick="deleted(${index})" class="btn btn-danger">Excluir</button>
                    </div>
                </div>
            </div>`;

            index++;
        }

        document.getElementById('lista').innerHTML = retorno;
    } catch (error) {
        console.error('ERROR: ', error.message);
    }
}

function loadDataUpdate(index) {
    try {
        let mensagens = getMensagens();

        document.getElementById('nome').value = mensagens[index].nome;
        document.getElementById('email').value = mensagens[index].email;
        document.getElementById('email').disabled = true;
        document.getElementById('mensagem').value = mensagens[index].mensagem;
        document.getElementById('btn-salvar').disabled = true;
        document.getElementById('btn-alterar').disabled = false;
    } catch (error) {
        console.error('ERROR: ', error.message);
    }
}

function update() {
    try {
        let mensagens = getMensagens();
        let indexMensagem = findIndexMensagemByEmail();

        let dados = setDataMensagem();

        mensagens[indexMensagem] = dados;

        localStorage.setItem('mensagens', JSON.stringify(mensagens));

        limparForm();
        read();
    } catch (error) {
        console.error('ERROR: ', error.message);
    }
}

function deleted(index) {
    try {
        let exclusao = confirm(`Tem certeza de que deseja excluir?`);
        if (exclusao == true) {
            let mensagens = localStorage.getItem('mensagens') ? JSON.parse(localStorage.getItem('mensagens')) : [];

            mensagens.splice(index, 1);

            localStorage.setItem('mensagens', JSON.stringify(mensagens));

            read();
            alert(`Dados excluídos`);

        } else {
            alert(`Exclusão cancelada.`);
        }

    } catch (error) {
        console.error('ERROR: ', error.message);
    }
}

function limparLista() {
    try {
        let exclusaoTotal = confirm (`Tem certeza de que deseja excluir TODOS os dados?`)
        if (exclusaoTotal == true) {

            localStorage.clear();

            read();
            alert(`Dados excluídos.`);

        } else {
            alert(`Exclusão cancelada.`);
        }

    } catch (error) {
        console.error('ERROR: ', error.message);
    }
}

function limparForm(){
    document.getElementById('nome').value = null;
    document.getElementById('email').value = null;
    document.getElementById('mensagem').value = null;

    document.getElementById('btn-salvar').disabled = false;
    document.getElementById('btn-alterar').disabled = true;
}

window.onload = function () {
    read();
}


/*
function filtrar() {
    try {
        let mensagens = getMensagens();
        let busca = document.getElementById('busca').value;
        let lista = document.getElementById('lista');

        const filtragemEmail = mensagens.filter((itemE) => {
            return itemE.email.includes(busca);         
        })

        const filtragemNome = mensagens.filter((itemN) => {
            return itemN.nome.includes(busca);         
        })

        if (filtragemEmail != '') {
            lista.style.display = "inline"
            mensagens.disabled = false;
        }

        if (filtragemEmail == '') {
            alert('Email não encontrado.');
        }

        if (mensagens != filtragemEmail) {
            mensagens.disabled = true;
        }

        if (filtragemNome != '') {
            lista.style.display = "inline"
            mensagens.disabled = false;
        }

        if (filtragemNome == '') {
            alert('Nome não encontrado.');
        }

        if (mensagens != filtragemNome) {
            mensagens.disabled = true;
        }

        console.log(filtragemEmail);
        console.log(filtragemNome);

    } catch (error) {
        alert(error.message);
    }

}


/*
function findIndexByName() {
    try {
    let mensagens = getMensagens();

    return mensagens.findIndex((data) => data.nome === document.getElementById('nome').value);
    
    } catch(error) {
        alert(error.message);
    }
}

function filtrar() {
    let mensagens = localStorage.getItem('mensagens') ? JSON.parse(localStorage.getItem('mensagens')) : [];
    let busca = document.getElementById('busca').value;

    if(busca.indexOf(mensagens)==-1) {
        alert('Não encontrado')
        document.getElementById("lista").style.display = "none";
    }

    if(busca.indexOf(mensagens)!=-1) {
        document.getElementById("lista").style.display = "block";
    }
}
*/
/*
function filtrar() {
    try {
        let mensagens = getMensagens();
        let pesquisa = document.getElementById('busca').value;
        let dados = localStorage.getItem('nome');

        if(pesquisa.indexOf(mensagens)== -1) {
            document.getElementById('lista').style.display = "none";
        }
        if(pesquisa.indexOf(mensagens)!= -1) {
            document.getElementById('lista').style.display = "block";
        }

    } catch (error) {
        alert(error.message);
    }
}
 /*
function validateEmail() {
try {
    let email = document.getElementById('email');

    if(email.indexOf("@"&".com")== -1) {
        alert('Email inválido')
    } else {
        alert('Email inválido')
        return false;
    }

    } catch(error) {
    alert(error.message)
    }
}
*/

/*
function filtrar() {
    
    var input, filter, list, row, a, i, txtValue;
    input = document.getElementById('busca');
    filter = input.value.toUpperCase();
    list = document.getElementById('lista');
    row = list.getElementsByClassName('row');
  
    for (i = 0; i < row.length; i++) {
      a = row[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        row[i].style.display = "";
      } else {
        row[i].style.display = "none";
      }
    }
}
/*function filtrar() {
    try {
    let mensagens = localStorage.getItem('mensagens') ? JSON.parse
    (localStorage.getItem('mensagens')) : [];
    let lista = document.getElementById('lista');
    lista = getMensagens().filter((mensagens) => mensagens === lista);
    } catch(error) {
        console.error('ERROR: ', error.message)
    }
}*/