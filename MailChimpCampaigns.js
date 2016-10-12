
/**
 * Mailchimp Campaigns JS
 */

var MailchimpCampaigns = {

    spinner: null,

    init: function(){
        this.spinner = $("<li class='title' id='ProcessListerSpinner'><i class='fa fa-lg fa-spin fa-spinner'></i></li>");
        $("#breadcrumbs ul.nav").append(this.spinner);
        this.initListSelect();
        this.initFolderSelect();
        this.bindNewsletterPreview();
        this.bindSelectNewsletterPage();
        this.spinner.fadeOut();
    },

    bindSelectNewsletterPage: function(){
        var that = this;
        if($("#Inputfield_newsletter_id").length){
            $("#Inputfield_newsletter_id").on("change", function(){
                console.log($(this).val());
                $.ajax({
                    url: config.MailChimp.urls.MailChimpCampaigns,
                    type: "post",
                    data: {
                        "getnlurl": 1,
                        "pid": $(this).val()
                    },
                    dataType: "json",
                    success: function(data){
                        console.log(data);
                        $('#Inputfield_newsletter_url').prev("p").html(data.body);
                        $('#Inputfield_newsletter_url').val(data.urls[0]['url']);
                    }
                });

            });
        }

    },

    initFolderSelect: function(){
        var that = this;
        if($("select[name='folder_id']").length){
            $("select[name='folder_id']").on("change", function(){
                that.spinner.fadeIn("fast");
                document.location.href = './?folder_id=' + $(this).val();
            });
        }
    },

    initListSelect: function(){

        // on change of list select, populate list defaults to fields
        if($("select[name='list_id']").length){
            $("select[name='list_id']").on("change", function(){
                console.log($(this).val());
                var $sel = $(this).find(":selected");
                console.log($sel.data("from_name"));
                var fromName = $sel.data("from_name");
                var fromEmail = $sel.data("reply_to");
                var emailSubject = $sel.data("subject_line");

                $('input[name="subject_line"]').val(emailSubject);
                $('input[name="reply_to"]').val(fromEmail);
                $('input[name="from_name"]').val(fromName);

            });
        }

    },

    bindNewsletterPreview: function(){

        var iframeSrc = null, buttonTitle = null;

        $('#MC_NewsletterPreview a button').bind('mousedown',function(e){
            e.stopPropagation();
            e.preventDefault();

            iframeSrc = $(this).parent().attr('href');
            buttonTitle = $(this).val();

            return false;
        });

        $('#MC_NewsletterPreview a').click(function(e){

            e.preventDefault();
            e.stopPropagation();

            $.fancybox({
                href: iframeSrc,
                title: buttonTitle + ' Preview',
                type: 'iframe',
            });

            return false;
        });

    }

};

$(document).ready(function(){

    MailchimpCampaigns.init();

    // remove scripts, because they've already been executed since we are manipulating the DOM below (WireTabs)
    // which would cause any scripts to get executed twice

    $t = $("#MailChimpCampaigns");
    $t.find("script").remove();

    $t.WireTabs({
        items: $("#MailChimpCampaigns > .Inputfields > .InputfieldWrapper"),
        id: 'MailChimpTabs'
    });

});

