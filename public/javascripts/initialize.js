/**
 * Created by rakshithk on 4/23/17.
 */
$( document ).ready(function() {
    $('#header').load('/templates/header.html', function() {
        $(".header-nav").sideNav();
    });

    $('#sidenav').load('/templates/sidenav.html', function() {
        $(".side-nav-button").sideNav();
        $('.side-nav-container').sideNav();
    });

    $('#footer').load('/templates/footer.html');
    
});