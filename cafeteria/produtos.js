var linha;
var btnConfirmar = criarBotao("btn-success", "fa-check");
var form = document.querySelector("#form-produto");


function criarLinha(nome, qtde, preco, id){
	var tr = document.createElement("tr");
	tr.classList.add("produto");
	tr.id = id;
	var tdFoto 	= document.createElement("td");
	var tdNome 	= document.createElement("td");
	tdNome.classList.add("nome");
	var tdQtde 	= document.createElement("td");
	tdQtde.classList.add("qtde");
	var tdPreco = document.createElement("td");
	tdPreco.classList.add("preco");
	var tdBotoes= document.createElement("td");

	tdNome.textContent = nome;
	tdQtde.textContent = qtde;
	tdPreco.textContent = "R$ " + preco;

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
}

var btnSalvar = document.querySelector("#btnSalvar");
btnSalvar.addEventListener("click", function(event) {
	event.preventDefault();

	criarLinha(form.nome.value, form.qtde.value, form.preco.value, localStorage.length/3 + 1);

	indice = (localStorage.length/3) + 1
	localStorage.setItem("nome_" + indice, form.nome.value);
	localStorage.setItem("qtde_" + indice, form.qtde.value);
	localStorage.setItem("preco_" + indice, form.preco.value);

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
		
		var indice = linha.id;
		localStorage.removeItem("nome_" + indice);
		localStorage.removeItem("qtde_" + indice);
		localStorage.removeItem("preco_" + indice);
		
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

for(var i=1; i<=(localStorage.length/3); i++ )
criarLinha(
	localStorage.getItem("nome_"+i), 
	localStorage.getItem("qtde_"+i), 
	localStorage.getItem("preco_"+i),
	i);