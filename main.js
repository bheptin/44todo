$(document).ready(function() {
    var site = "https://fathomless-woodland-51903.herokuapp.com"



    $(document).ready(()=> {
      ///getting information from server and turning it over to site
      $.getJSON({
        url: `${site}/todos`,
        headers: {
          "Authorization": "Token token=supadupasecret"
        },
        success: (response) => {
          var todoHTML = response.data.map((todo) => `<li data-id=${todo.id} ${todo.attributes}>
          ${todo.attributes.input}<input class ="checked" type="checkbox" name="selection">
          <button>Delete</button></li>`);

          ///adding the server info to the todo ul
          $("#todo").append(todoHTML.join("\n"));

        }
      });


      ///getting info from site back to server
      $.ajax({
        type: "GET",
        url: `${site}/todos`,
        headers: {
          "Authorization": "Token token=supadupasecret"
        },
        ///function to get data back to server
        success: function (data){
          $.each( function(){
            todoHTML.append(`<li data-id=${todo.id} ${todo.attributes}>
            ${todo.attributes.input} <input class ="checked" type="checkbox" name="selection">
            <button>Delete</button></li>`);
          });

          ////setting form for url
          $("form").submit(function(event){
            $.post({
              url: `${site}/todo`,
              headers: {
                "Authorization": "Token token=supadupasecret"
              },
              data: $(this).serialize(),  ////parameters
              success: function(response){
                $("#todo li:last").data(response.attributes.id) ///response=data key///data&id value from server
              },

            });
            var todoHTML = `<li>${$(this).find("textarea").val()}
            <input class ="checked" type="checkbox" name="selection">
            <button>Delete</button></li>`;
            $("#todo").append(todoHTML);  ////this makes an html skeleton "this" is the FORM

            event.preventDefault(); ///keeps form data from being lost on button click
            $("textarea").val("");

          });

        }
      })

    })
})
