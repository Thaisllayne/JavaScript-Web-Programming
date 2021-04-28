let botaoAdicionar = document.querySelector("#adicionar-paciente");

botaoAdicionar.addEventListener("click", (event)=>{
    event.preventDefault(); // está prevenindo o comportamento padrão, que nesse caso, é o comportamento de recarregar a página (já que está dentro de um form)
    
    let form = document.querySelector("#form-adicionar");
    let paciente = obtemPacienteDoForm(form);

    let erros = validaPaciente(paciente)
    if (erros.length > 0){
        exibeMensagensDeErro(erros)
        return;
    }

    adicionaPacienteNaTabela(paciente)

    // para o formulário limpar os campos:
    form.reset();
    var mensagemErro = document.querySelector("#mensagens-erro")
    mensagemErro.innerHTML = "";
})

function adicionaPacienteNaTabela(paciente){
    let pacienteTr = montaTr(paciente);
    let tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr)
}

function exibeMensagensDeErro(erros){
    let ul = document.querySelector('#mensagens-erro')
    ul.innerHTML = "";

    erros.forEach(function(erro){
        var li = document.createElement("li")
        li.textContent = erro;
        ul.appendChild(li);
    })
}

function obtemPacienteDoForm(form){

    // pegando os dados do formulário no html e colocando em um objeto:
    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }
    return paciente;
}

function montaTr(paciente){

    // cria tr e td do paciente
    let pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");

    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

    return pacienteTr;
}

function montaTd(dado, classe){
    let td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;
}

function validaPaciente(paciente){

    var erros=[]

    if(paciente.nome.length == 0) erros.push("Preencha o campo nome!")
    if (paciente.peso.length == 0) erros.push("Preencha o campo peso!")
        
    if (paciente.altura.length == 0) erros.push("Preencha o campo altura!")
    
    if (paciente.gordura.length == 0) erros.push("Preencha o campo gordura!") 

    if (!validaPeso(paciente.peso)) erros.push("Peso é inválido!")

    if (!validaAltura(paciente.altura)) erros.push("Altura é inválida!")

    return erros
}