// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    // Adiciona event listeners para as caixas de presente (poemas)
    const giftBoxes = document.querySelectorAll('.gift-box');
    giftBoxes.forEach(box => {
        box.addEventListener('click', function() {
            toggleGiftBox(this);
        });
    });

    // Adiciona event listeners para as fotos da galeria
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach(item => {
        item.addEventListener('click', function() {
            openModal(this);
        });
    });

    // Fecha modal ao clicar no X
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeModal();
        });
    }

    // Fecha modal ao clicar fora dele
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('photoModal');
        if (event.target === modal) {
            closeModal();
        }
    });

    // Efeito parallax sutil nos corações decorativos fixos ao rolar a página
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hearts = document.querySelectorAll('.heart-decoration');
        hearts.forEach(heart => {
            const speed = 0.3; // Movimento sutil
            heart.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    console.log('Site romântico para Alícia carregado com sucesso! 💖 Clique nas caixas para testar.');
});

// Função para abrir/fechar as caixas de presente
function toggleGiftBox(box) {
    // Alterna a classe 'open' para animação CSS
    box.classList.toggle('open');
    
    if (box.classList.contains('open')) {
        // Ao abrir: Mostra o conteúdo com animação e cria corações voando
        const content = box.querySelector('.gift-content');
        if (content) {
            content.style.opacity = '1';
            content.style.transform = 'scale(1) rotateY(0deg)';
        }
        
        // Cria os corações voando da posição da caixa
        createFlyingHearts(box);
    } else {
        // Ao fechar: Esconde o conteúdo com animação
        const content = box.querySelector('.gift-content');
        if (content) {
            content.style.opacity = '0';
            content.style.transform = 'scale(0.8) rotateY(90deg)';
        }
    }
}

// Função para criar corações voando (explosão romântica: 8 corações sobem girando)
function createFlyingHearts(box) {
    // Pega a posição real da caixa na tela
    const rect = box.getBoundingClientRect();
    const heartTypes = ['❤', '💕', '💖', '💗', '💓', '💔']; // Variações de emojis
    
    // Cria 8 corações
    for (let i = 0; i < 8; i++) {
        // Cria o elemento div para o coração
        const heart = document.createElement('div');
        heart.className = 'flying-heart';
        heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
        
        // Posição inicial aleatória dentro da caixa
        heart.style.left = (rect.left + Math.random() * rect.width) + 'px';
        heart.style.top = (rect.top + Math.random() * rect.height) + 'px';
        
        // Estilos aleatórios para variedade (tamanho, duração, delay)
        heart.style.fontSize = (1 + Math.random() * 1) + 'em'; // Tamanho entre 1-2em
        heart.style.animationDuration = (3 + Math.random() * 4) + 's'; // Duração 3-7s
        heart.style.animationDelay = (Math.random() * 0.5) + 's'; // Delay pequeno
        
        // Adiciona o coração ao body (para posicionamento fixed)
        document.body.appendChild(heart);
        
        // Remove o coração após a animação terminar (limpeza para performance)
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 7000); // Duração max + buffer de 1s
    }
}

// Função para abrir o modal da foto
function openModal(photoItem) {
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalImg');
    const img = photoItem.querySelector('.gallery-photo');
    
    if (!modal || !modalImg || !img) return; // Evita erros se elementos não existirem
    
    // Mostra o modal
    modal.style.display = 'block';
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    
    // Cria 6 corações orbitando ao redor da foto no modal
    const modalHearts = modal.querySelector('.modal-hearts');
    if (modalHearts) {
        modalHearts.innerHTML = ''; // Limpa corações anteriores
        for (let i = 0; i < 6; i++) {
            const heart = document.createElement('div');
            heart.className = 'modal-heart';
            heart.innerHTML = ['💖', '💕', '❤'][Math.floor(Math.random() * 3)]; // Variação
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.animationDelay = (Math.random() * 3) + 's'; // Delay aleatório
            modalHearts.appendChild(heart);
        }
    }
}

// Função para fechar o modal
function closeModal() {
    const modal = document.getElementById('photoModal');
    if (modal) {
        modal.style.display = 'none';
    }
}