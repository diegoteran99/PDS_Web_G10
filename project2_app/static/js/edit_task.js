function saveDescription(){
    let text_object = $("#description-text");
    let task_id = text_object.data("task_id");
    if(text_object.val() != ''){
        $.ajax({
            url: `/tasks/${task_id}/`,
            type: "POST",
            data: {
                ident: "description",
                description: text_object.val()
            }
            /*
            success: function (data) {
                SetProgressBarRestrictions();
                SwalAlert("success", "Descripcion guardada con exito")
            },
            error: function (error) {
                SwalAlert("error", "Error al guardar descripcion")
            }*/
        });
    }
}
function saveImage(){
    let text_object = $("#exampleFormControlFile1-text");
    let task_id = text_object.data("task_id");
    if(text_object.val() != ''){
        $.ajax({
            url: `/tasks/${task_id}/`,
            type: "POST",
            data: {
                ident: "image",
                image: text_object.val()
            }

        });
    }
}

function saveJson(){
    let text_object = $("#exampleFormControlFile1-text");
    let task_id = text_object.data("task_id");
    if(text_object.val() != ''){
        $.ajax({
            url: `/tasks/${task_id}/`,
            type: "POST",
            data: {
                ident: "image",
                image: text_object.val()
            }

        });
    }

}

$( document ).ready(function() {
    $("#description-text").focusout(function () {
        saveDescription();
    })
    $("#exampleFormControlFile1-text").click(function () {
        saveImage();
    })
    $("#btnSaveCanvas").click(function(){saveJson()});
});