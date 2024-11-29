$(function () {
    function setupMenu(menuSelector) {
        var $menu = $(menuSelector);
        var $list = $menu.find('.list');
        var isDragging = false;
        var currentIndex = 0;
        var lastMouseX = 0;
        var totalImages = $list.find('li').length;

        // Multiplicador de sensibilidade
        var sensitivityMultiplier = 1; // Aumente ou diminua para ajustar a sensibilidade

        // Inicializa as imagens
        $list.find('li').css({
            'opacity': '0',
            'position': 'absolute',
            'top': '0',
            'left': '0',
            'z-index': '1',
        });
        $list.find('li').eq(currentIndex).css({ 'opacity': '1', 'z-index': '2' });

        function showImage(index) {
            $list.find('li').css({ 'opacity': '0', 'z-index': '1' });
            $list.find('li').eq(index).css({ 'opacity': '1', 'z-index': '2' });
        }

        function resetMenu() {
            currentIndex = 0;
            showImage(currentIndex);
        }

        // Detecta início do movimento (mouse ou touch)
        $list.on('mousedown touchstart', function (event) {
            isDragging = true;
            lastMouseX = event.type === 'mousedown' ? event.pageX : event.originalEvent.touches[0].pageX;
            event.preventDefault();
        });

        // Detecta movimento (mouse ou touch)
        $list.on('mousemove touchmove', function (event) {
            if (!isDragging) return;

            var mouse_X = event.type === 'mousemove' ? event.pageX : event.originalEvent.touches[0].pageX;
            var deltaX = (mouse_X - lastMouseX) * sensitivityMultiplier; // Ajusta a sensibilidade

            if (Math.abs(deltaX) >= 10) { // Fixamos 10 como limiar mínimo de movimento
                currentIndex = deltaX > 0
                    ? (currentIndex - 1 + totalImages) % totalImages
                    : (currentIndex + 1) % totalImages;

                showImage(currentIndex);
                lastMouseX = mouse_X; // Atualiza o ponto inicial
            }
        });

        // Detecta fim do movimento (mouse ou touch)
        $(document).on('mouseup touchend', function () {
            isDragging = false;
        });

        return resetMenu;
    }

    // Configuração dos menus
    var resetMenu1 = setupMenu('#menu1');
    var resetMenu2 = setupMenu('#menu2');

    // Lógica de alternância entre menus
    $('#btnBiz125Ex').on('click', function () {
        $('#menu1').show();
        $('#menu2').hide();
        resetMenu1();
        $(this).addClass('active');
        $('#btnBiz125Es').removeClass('active');
    });

    $('#btnBiz125Es').on('click', function () {
        $('#menu1').hide();
        $('#menu2').show();
        resetMenu2();
        $(this).addClass('active');
        $('#btnBiz125Ex').removeClass('active');
    });

    // Mostra o menu 1 por padrão
    $('#btnBiz125Ex').trigger('click');
});