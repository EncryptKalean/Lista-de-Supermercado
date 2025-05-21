const produtoNome = document.querySelector('input[name=nome_produto]'),
      produtoPreco = document.querySelector('input[name=valor_produto]'),
      lista = document.querySelector('.lista');

let itens = JSON.parse(localStorage.getItem('lista')) ?? [],
    soma = 0;

document.querySelector('input[name=acao]').addEventListener('click',()=>{
    let verificacaoNome = produtoNome.value.trim(),
        verificacaoPreco = produtoPreco.value.trim();

    if(verificacaoNome == ""){
        produtoNome.style.borderColor = 'red'
    }
    else if(verificacaoPreco == ""){
        produtoPreco.style.borderColor = 'red'
    }
    else {
        itens.push({
            nome: produtoNome.value.trim(),
            preco: produtoPreco.value,
            })

            renderizar();

            produtoNome.style.borderColor = 'var(--cortema)'
            produtoPreco.style.borderColor = 'var(--cortema)'
    }
})

function renderizar(){
    lista.innerHTML='';
    soma = 0
    itens.forEach((val, index)=>{
        soma += parseFloat(val.preco);
        lista.innerHTML+=`
        <li>
            <h3 class="produto_nome">`+val.nome+`</h3>
            <h3 class="produto_valor"><span>R$`+Number(val.preco).toFixed(2)+`</span><a class="deletar" index="${index}">X</a></h3>
        </li>
        `;
    })

    soma = soma.toFixed(2);
    
    produtoNome.value = '';
    produtoPreco.value = '';
    
    document.querySelector('.total').innerText = `Total: R$${soma}`;
    localStorage.setItem("lista", JSON.stringify(itens));
}

renderizar();

document.querySelector('button[name=limpar]').addEventListener('click',()=>{
    itens = [];
    localStorage.removeItem('lista'); 
    renderizar();
})

lista.addEventListener('click', (event) => {
  if (event.target.classList.contains('deletar')) {
    const index = event.target.getAttribute('index');
    itens.splice(index, 1);
    renderizar()
  }
});