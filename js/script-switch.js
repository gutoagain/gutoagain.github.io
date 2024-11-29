$(document).ready(function() {
    // Inicializa com o primeiro menu visível
    $('#menu2').hide();  // Esconde o segundo menu no carregamento da página
    $('#btnBiz125Ex').addClass('active'); // Ativa o botão Biz 125 EX inicialmente

    // Função para alternar entre os botões e menus
    $('#btnBiz125Ex').click(function() {
        // Adiciona a classe 'active' ao botão Biz 125 EX e remove do botão Biz 125 ES
        $(this).addClass('active');
        $('#btnBiz125Es').removeClass('active');
        // Exibe o primeiro menu e oculta o segundo
        $('#menu1').show();
        $('#menu2').hide();
    });

    $('#btnBiz125Es').click(function() {
        // Adiciona a classe 'active' ao botão Biz 125 ES e remove do botão Biz 125 EX
        $(this).addClass('active');
        $('#btnBiz125Ex').removeClass('active');
        // Exibe o segundo menu e oculta o primeiro
        $('#menu2').show();
        $('#menu1').hide();
    });
});