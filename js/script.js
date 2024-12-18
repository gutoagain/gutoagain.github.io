$(function() {
    var pic_X = $('.list').offset().left;
    var pic_W = $('.list').width() / 2;

    var movestop = pic_W / 20; // Define o quanto o mouse precisa se mover para trocar de imagem

    var isDragging = false; // Estado para verificar se está arrastando
    var currentIndex = 0;   // Índice da imagem visível
    var lastMouseX = 0;     // Posição anterior do mouse
    var totalImages = 32;   // Número total de imagens (0 a 18)

    // Adicionar uma classe para animações suaves via CSS
    $('.list li').css({
        'opacity': '0',
        'position': 'absolute', // Mantém as imagens empilhadas
        'top': 'center',
        'left': 'center',
        'z-index': '1'
    });

    // Garantir que apenas a primeira imagem seja visível no carregamento
    $('.list li').eq(currentIndex).css({ 'opacity': '1', 'z-index': '2' }); // Exibe a primeira imagem

    // Detectar início do arrasto
    $('.list').on('mousedown', function(event) {
        if (event.which === 1) { // Verifica se o botão esquerdo foi pressionado
            isDragging = true;
            lastMouseX = event.pageX; // Armazena a posição inicial do mouse
            event.preventDefault(); // Previne comportamentos padrão
        }
    });

    // Detectar movimento do mouse enquanto arrasta
    $('.list').on('mousemove', function(event) {
        if (!isDragging) return; // Só executa se estiver segurando e arrastando

        var mouse_X = event.pageX;
        var deltaX = mouse_X - lastMouseX; // Calcula o deslocamento do mouse em relação à posição anterior

        if (Math.abs(deltaX) >= movestop) { // Só troca a imagem se o deslocamento for suficiente
            if (deltaX > 0) {
                // Movendo para a direita (giro para trás)
                currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            } else {
                // Movendo para a esquerda (giro para frente)
                currentIndex = (currentIndex + 1) % totalImages;
            }

            // Atualiza a exibição da imagem
            $('.list li').css({ 'opacity': '0', 'z-index': '1' }); // Oculta todas
            $('.list li').eq(currentIndex).css({ 'opacity': '1', 'z-index': '2' }); // Exibe a atual

            lastMouseX = mouse_X; // Atualiza a posição anterior do mouse
        }
    });

    // Detectar quando o arrasto termina
    $(document).on('mouseup', function(event) {
        if (event.which === 1) { // Apenas reage ao botão esquerdo
            isDragging = false; // Desativa o estado de arrasto
        }
    });

});