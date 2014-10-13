$(document).ready(function(){



    $('#MC_NewsletterPreview a button').bind('mousedown',function(e){
        e.stopPropagation();
        e.preventDefault();
        $(this).parent().addClass("iframe");
        var h = $(window).height()-65;
        var w = $(window).width() > 1150 ? 1150 : $(window).width()-100;
        $(this).parent().fancybox({
            hideOnContentClick: false,
            centerOnScroll: false,
            frameWidth: w,
            frameHeight: h
        }).trigger('click');
        return false;
     });
    $('#MC_NewsletterPreview a').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        return false;
    });

    // remove scripts, because they've already been executed since we are manipulating the DOM below (WireTabs)
    // which would cause any scripts to get executed twice

    $t = $("#MailChimpLists");
    $t.find("script").remove();

    $t.WireTabs({
        items: $("#MailChimpLists > .Inputfields > .InputfieldWrapper"),
        id: 'MailChimpTabs'
    });

});
