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

function saveJson(){
    let text_object = $("#btnSaveCanvas");
    let task_id = text_object.data("task_id");
    console.log(jsonkonva)

    $.ajax({
        url: `/tasks/${task_id}/`,
        type: "POST",
        data: {
            ident: "json",
            json_: jsonkonva
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

$( document ).ready(function() {
    $("#description-text").focusout(function () {
        saveDescription();
    })
    $("#btnSaveCanvas").click(function(){saveJson()});
});