function saveTitle(){
    let text_object = $("#title-text");
    if(text_object.val() != ''){
        $.ajax({
            url: `/task/${task_id}/`,
            type: "PATCH",
            data: {
                title: text_object.val()
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            },
            success: function (data) {
                SetProgressBarRestrictions();
                SwalAlert("success", "Descripcion guardada con exito")
            },
            error: function (error) {
                SwalAlert("error", "Error al guardar descripcion")
            }
        });
    }
}

$( document ).ready(function() {
    $("#title-text").focusout(function () {
        saveTitle();
    })
});