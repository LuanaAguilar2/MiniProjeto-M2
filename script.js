// Classe Curriculo
class Curriculo {
    constructor(nome, data, cpf, email, num, civil, genero, endereco, cep, bairro, cidade, estado, nacionalidade, formacao, deficiencia, experiencia, trabalho, cargA, cargD) {
        this.nome = nome;
        this.data = data;
        this.cpf = cpf;
        this.email = email;
        this.num = num;
        this.civil = civil;
        this.genero = genero;
        this.endereco = endereco;
        this.cep = cep;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.nacionalidade = nacionalidade;
        this.formacao = formacao;
        this.deficiencia = deficiencia;
        this.experiencia = experiencia;
        this.trabalho = trabalho;
        this.cargA = cargA;
        this.cargD = cargD;
    }
}

// Função para obter currículos do localStorage
const obterCurriculos = () => JSON.parse(localStorage.getItem("curriculos")) || [];

// Função para salvar currículos no localStorage
const salvarCurriculos = (curriculos) => localStorage.setItem("curriculos", JSON.stringify(curriculos));

// Função para validar duplicidade
const validarDuplicidade = (nome, cpf, editarIndex) => {
    const curriculos = obterCurriculos();
    return curriculos.some((curriculo, index) => (curriculo.nome === nome || curriculo.cpf === cpf) && index !== editarIndex);
};

// Função para limpar o formulário
const limparFormulario = () => {
    document.querySelector("form").reset();
};

const preencheCadastro = () => {
    console.log("DDDDDDDDDDD")
    localStorage.removeItem("index")
    localStorage.setItem("modoEdicao", JSON.stringify(false))
}

const preencheInfoEditar = (index) => {
    localStorage.setItem("index", JSON.stringify(index))
    localStorage.setItem("modoEdicao", JSON.stringify(true))
}

// Função para atualizar a lista de currículos
const atualizarLista = () => {
    const curriculos = obterCurriculos();
    const lista = document.getElementById("curriculos-lista");

    lista.innerHTML = "";
    console.log("chegou aqui", curriculos)
    curriculos.forEach((curriculo, index) => {

        const div = document.createElement("div");
        div.classList.add("curriculo");

        div.innerHTML = `
        <p><strong>Nome:</strong> <p id="nameUser">${curriculo.nome}</p></p>
            <p><strong >Data de Nascimento:</strong>  ${curriculo.data}</p>
            <p><strong>CPF:</strong> ${curriculo.cpf}</p>
            <p><strong>Email:</strong> ${curriculo.email}</p>
            <p><strong>Contato: </strong>${curriculo.num}</p>
            <p><strong>Estado civil: </strong>${curriculo.civil}</p>
            <p><strong>Gênero: </strong>${curriculo.genero}</p>
            <p><strong>Endereço: </strong>${curriculo.endereco}</p>
            <p><strong>Bairro:</strong> ${curriculo.bairro}</p>
            <p><strong>Cidade:</strong> ${curriculo.cidade}</p>
            <p><strong>Estado: </strong>${curriculo.estado}</p>
            <p><strong>Nacionalidade: </strong>${curriculo.nacionalidade}</p>
            <p><strong>Formação: </strong>${curriculo.formacao}</p>
            <p><strong>Deficiência:</strong> ${curriculo.deficiencia}</p>
            <p><strong>Experiência Profissional:</strong> ${curriculo.experiencia}</p>
            <p><strong>Tipo de Trabalho:</strong> ${curriculo.trabalho}</p>
            <p><strong>Cargo atual: </strong>${curriculo.cargA}</p>
            <p><strong>Cargo desejado: </strong>${curriculo.cargD}</p>
            <a href="forms.html"><button class="editar" onclick="preencheInfoEditar(${index})">Editar</button></a>
            <button class="excluir" onclick="excluirCurriculo(${index})">Excluir</button>
        `;

        lista.appendChild(div);
    });
};
//<button class="editar" onclick="editarCurriculo(${index})">Editar</button>

// Função para salvar dados (novo ou edição)
const salvarDados = (editarIndex = null) => {


    const nome = document.getElementById("nameUser").value.trim();
    const data = document.getElementById("date").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const email = document.getElementById("email").value.trim();
    const num = document.getElementById("contact").value.trim();
    const civil = document.getElementById("civil").value.trim();
    const genero = document.getElementById("gender").value.trim();
    const endereco = document.getElementById("address").value.trim();
    const cep = document.getElementById("cep").value.trim();
    const bairro = document.getElementById("district").value.trim();
    const cidade = document.getElementById("city").value.trim();
    const estado = document.getElementById("state").value.trim();
    const nacionalidade = document.getElementById("nationality").value.trim();
    const formacao = document.getElementById("education").value.trim();
    const deficiencia = document.querySelector('input[name="deficiency"]:checked')?.value || "Não especificado";
    const experiencia = document.getElementById("experience").value.trim();
    const trabalho = document.getElementById("work").value.trim();
    const cargA = document.getElementById("position").value.trim();
    const cargD = document.getElementById("positionD").value.trim();

    /*if (validarDuplicidade(nome, cpf, editarIndex)) {
        alert("Já existe um currículo cadastrado com esse nome ou CPF.");
        return;
    }*/

    const curriculo = new Curriculo(nome, data, cpf, email, num, civil, genero, endereco, cep, bairro, cidade, estado, nacionalidade, formacao, deficiencia, experiencia, trabalho, cargA, cargD);

    const curriculos = obterCurriculos();


    const index = JSON.parse(localStorage.getItem("index"))
    const modoEdicao = JSON.parse(localStorage.getItem("modoEdicao"))
    if (modoEdicao) {
        const novosDados = curriculos.splice(index, 1, curriculo)
        localStorage.setItem("curriculos", JSON.stringify(novosDados));
    }
    /*else {
        curriculos.push(curriculo)
        console.log("AAAAAAAAAAAAAAAAAAA ", curriculos)

        localStorage.setItem("curriculos", JSON.stringify(curriculos));
    }*/


    /*if (editarIndex !== null) {
        curriculos[editarIndex] = curriculo;
        alert("Currículo atualizado com sucesso!");
    } else {
        curriculos.push(curriculo);
        alert("Currículo cadastrado com sucesso!");
    }*/
    curriculos.push(curriculo)
    salvarCurriculos(curriculos);
    atualizarLista();
    limparFormulario();
};

// Função para editar currículo
const editarCurriculo = (index) => {
    const curriculos = obterCurriculos();
    const curriculo = curriculos[index];
    console.log("aaaaaaaaaaa", document.getElementById("nameUser").value = curriculo.nome);
    console.log("nameUser ", document.getElementById("nameUser").value)

    document.getElementById("nameUser").value = curriculo.nome;
    document.getElementById("date").value = curriculo.data;
    document.getElementById("cpf").value = curriculo.cpf;
    document.getElementById("email").value = curriculo.email;
    document.getElementById("contact").value = curriculo.num;
    document.getElementById("civil").value = curriculo.civil;
    document.getElementById("gender").value = curriculo.genero;
    document.getElementById("address").value = curriculo.endereco;
    document.getElementById("cep").value = curriculo.cep;
    document.getElementById("district").value = curriculo.bairro;
    document.getElementById("city").value = curriculo.cidade;
    document.getElementById("state").value = curriculo.estado;
    document.getElementById("nationality").value = curriculo.nacionalidade;
    document.getElementById("education").value = curriculo.formacao;
    document.querySelector(`input[name="deficiency"][value="${curriculo.deficiencia}"]`).checked = true;
    document.getElementById("experience").value = curriculo.experiencia;
    document.getElementById("work").value = curriculo.trabalho;
    document.getElementById("position").value = curriculo.cargA;
    document.getElementById("positionD").value = curriculo.cargD;

    const botaoEnviar = document.querySelector(".enviar");
    botaoEnviar.textContent = "Salvar Alterações";
    botaoEnviar.onclick = () => {
        salvarDados(index);
        botaoEnviar.textContent = "Enviar";
        botaoEnviar.onclick = () => salvarDados();
    };
};

// Função para excluir currículo
const excluirCurriculo = (index) => {
    const curriculos = obterCurriculos();
    curriculos.splice(index, 1);
    salvarCurriculos(curriculos);
    atualizarLista();
};

// Atualiza a lista ao carregar a página
document.addEventListener("DOMContentLoaded", atualizarLista);



const curriculos = obterCurriculos();
const index = JSON.parse(localStorage.getItem("index"))
const modoEdicao = JSON.parse(localStorage.getItem("modoEdicao"))

if (modoEdicao) {
    const curriculo = curriculos[index];
    document.getElementById("nameUser").value = curriculo.nome;
}

editarCurriculo()