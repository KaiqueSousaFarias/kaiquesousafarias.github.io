document.addEventListener('DOMContentLoaded', function() {
    fetch('../data/produtos.json')
        .then(response => response.json())
        .then(data => {
            // Aqui você pode manipular os dados do JSON
            console.log(data); // Exemplo: exibir os dados no console

            // Exemplo de exibição dos produtos na página HTML
            const productsContainer = document.querySelector('.products');

            data.forEach(produtos => {
                const card = document.createElement('div');
                card.classList.add('product');

                card.innerHTML = `
                    <h2>${produtos.nome}</h2>
                    <p>${produtos.descricao}</p>
                    <p>Preço: R$ ${produtos.preco.toFixed(2)}</p>
                    <img src="assets/img/produtos/${produtos.imagem}" alt="${produtos.nome}">
                    <button class="add-to-cart" onclick="addToCart('${produtos.nome}')">Adicionar ao Carrinho</button>
                `;

                productsContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar produtos:', error);
        });
});

// Função para mostrar/esconder o carrinho
function toggleCart() {
    const cart = document.getElementById('cart');
    cart.style.display = cart.style.display === 'block' ? 'none' : 'block';
}


// Função para adicionar itens ao carrinho
function addToCart(productName) {
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    cart.push(productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI(); // Atualiza a interface do carrinho após adicionar um produto
//    alert('Produto adicionado ao carrinho!');
}

// Função para atualizar a interface do carrinho
function updateCartUI() {
    let cartItems = document.getElementById('cart-items');
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    // Limpa a lista de itens do carrinho
    cartItems.innerHTML = '';

    // Adiciona os itens do carrinho à lista
    cart.forEach((product) => {
        let li = document.createElement('li');
        li.textContent = product;
        cartItems.appendChild(li);
    });
}

// Função para finalizar a compra (enviar mensagem para WhatsApp)
function checkout() {
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    
    if (cart.length === 0) {
//        alert('Seu carrinho está vazio!');
        return;
    }

    let message = 'Olá! Gostaria de fazer o pedido dos seguintes produtos:\n';
    cart.forEach((product, index) => {
        message += `${index + 1}. ${product}\n`;
    });

    // Substitua 'SeuNumero' pelo número de WhatsApp para onde deseja enviar a mensagem
    window.open(`https://wa.me/5511970456438/?text=${encodeURIComponent(message)}`, '_blank');

    // Limpa o carrinho após finalizar a compra
    localStorage.removeItem('cart');
    updateCartUI(); // Atualiza a interface do carrinho após limpar
//    alert('Pedido enviado para WhatsApp!');
}

// Atualiza a interface do carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    updateCartUI();
});
