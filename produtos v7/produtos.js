var linha;
var btnConfirmar = criarBotao("btn-success", "fa-check");
var form = document.querySelector("#form-produto");


var btnSalvar = document.querySelector("#btnSalvar");
btnSalvar.addEventListener("click", function(event) {
	event.preventDefault();

	var tr = document.createElement("tr");
	tr.classList.add("produto");
	var tdFoto 	= document.createElement("td");
	var tdNome 	= document.createElement("td");
	tdNome.classList.add("nome");
	var tdQtde 	= document.createElement("td");
	tdQtde.classList.add("qtde");
	var tdPreco = document.createElement("td");
	tdPreco.classList.add("preco");
	var tdBotoes= document.createElement("td");

	var form = document.querySelector("#form-produto");

	tdNome.textContent = form.nome.value;
	tdQtde.textContent = form.qtde.value;
	tdPreco.textContent = "R$ " + form.preco.value;

	tr.appendChild(tdFoto);
	tr.appendChild(tdNome);
	tr.appendChild(tdQtde);
	tr.appendChild(tdPreco);
	tr.appendChild(tdBotoes);

	var table = document.querySelector("#table");
	table.appendChild(tr);

	var btnApagar = criarBotao("btn-danger", "fa-trash-alt");
	btnApagar.addEventListener("click", apagarProduto);
	btnApagar.classList.add("btn-apagar");
	var btnEditar = criarBotao("btn-primary", "fa-edit");
	btnEditar.addEventListener("click", editarProduto);
	btnEditar.classList.add("btn-editar");
	var btnCopiar = criarBotao("btn-warning", "fa-copy");
	tdBotoes.appendChild(btnApagar);
	tdBotoes.appendChild(btnEditar);
	tdBotoes.appendChild(btnCopiar);
} );

function criarBotao(cor, icone){
	var i 	= document.createElement("i");
	var btn = document.createElement("button");
	btn.appendChild(i);
	btn.classList.add("btn", cor);
	i.classList.add("fas", icone);
	return btn;
}

var btnApagar = document.querySelectorAll(".btn-apagar");
btnApagar.forEach(function(botao){
	botao.addEventListener("click", apagarProduto);
});

 function apagarProduto(event){
		var linha;
		if(event.target.hasChildNodes()) {
			linha = event.target.parentNode.parentNode;
		} else {
			linha = event.target.parentNode.parentNode.parentNode;
		}
		linha.classList.add("fade-out");
		
		setTimeout(function(){
			linha.remove();
		}, 1000);
	}


filtro.addEventListener("input", function(){
	var produtos = document.querySelectorAll(".produto");
	var busca = filtro.value;
	var expressao = RegExp(busca, "i");
	
	produtos.forEach(function (produto){
		var nome = produto.querySelector(".nome").textContent;
		if (expressao.test(nome)){
			produto.classList.remove("invisivel");
		}else{
			produto.classList.add("invisivel");
		}
	});
	//se a busca estiver vazia, mostra todos produtos
	if (busca.length == 0){
		produtos.forEach(function (produto){
			produto.classList.remove("invisivel");
		});
	}

});

var btnEditar = document.querySelectorAll(".btn-editar");
btnEditar.forEach(function(botao){
	botao.addEventListener("click", editarProduto);
});

function editarProduto(event){
	if(event.target.hasChildNodes()) {
			linha = event.target.parentNode.parentNode;
		} else {
			linha = event.target.parentNode.parentNode.parentNode;
		}
		var nome = linha.querySelector(".nome").textContent;
		var qtde = linha.querySelector(".qtde").textContent;
		var preco = linha.querySelector(".preco").textContent;
		
		form.nome.value = nome;
		form.qtde.value = qtde;
		form.preco.value = preco;

		btnSalvar.classList.add('invisivel');
		form.appendChild(btnConfirmar);
	
}


btnConfirmar.addEventListener("click", function(event){
	event.preventDefault();

	linha.querySelector(".nome").textContent = form.nome.value;
	linha.querySelector(".qtde").textContent = form.qtde.value;

	var p = form.preco.value;
	if (p.substring(0,2) != "R$") p = "R$ " + p;

	linha.querySelector(".preco").textContent =  p;
	
	btnConfirmar.remove();
	btnSalvar.classList.remove("invisivel");
	form.reset();
});