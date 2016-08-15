$(document).ready(function() {
    var site = "https://fathomless-woodland-51903.herokuapp.com";


    $(document).ready(()=> {
      ///getting information from server and turning it over to site in object notation
      $.getJSON({
        url: `${site}/todos`,
        headers: {
          "Authorization": "Token token=supadupasecret"
        },
        success: (response) => {
          var taskHTML = response.data.map((task) => `<li data-id=${task.id} ${task.attributes.todo}>
          ${task.attributes.input}<input class ="checked" type="checkbox" name="selection">
          <button>Delete</button></li>`);

          ///adding the server info to the todo ul
          $("#todo").append(taskHTML.join("\n"));

        }
      });


      ///getting info from site back to server in "realtime"
      $.ajax({
        type: "GET",
        url: `${site}/todos`,
        headers: {
          "Authorization": "Token token=supadupasecret"
        },
        ///function to get data back to server
        success: function (data){
          $.each( function(){
            taskHTML.append(`<li data-id=${task.id} ${task.attributes}>
            ${todo.attributes.input} <input class ="checked" type="checkbox" name="selection">
            <button>Delete</button></li>`);
          });

          ////setting form for url
          $("form").submit(function(event){
            $.post({
              url: `${site}/todos`,
              headers: {
                "Authorization": "Token token=supadupasecret"
              },
              data: $(this).serialize(),  ////parameters
              success: function(response){
                $("#todo li:last").data("id", response.attributes.id) ///response=data key///data&id value from server
              },

            });
            var taskHTML = `<li>${$(this).find("input").val()}`;
            $("#todo").append(taskHTML);  ////this makes an html skeleton "this" is the FORM

            event.preventDefault(); ///keeps form data from being lost on button click
            $("input").val("");

          });

        }
      })

    })
})
