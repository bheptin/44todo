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

          $("#todo").append(todoHTML.join("\n")); ///adds unordered list to

        }
      });



      $.ajax({
        type: "GET",
        url: `${site}/todos`,
        headers: {
          "Authorization": "Token token=supadupasecret"
        },
        success: function (data){
          $.each( function(){
            todoHTML.append(`<li data-id=${todo.id} ${todo.attributes}>
            ${todo.attributes.input} <input class ="checked" type="checkbox" name="selection">
            <button>Delete</button></li>`);
          });

          $("form").submit(function(event){ ////setting form for url
            $.post({
              url: `${site}/todo`,
              headers: {
                "Authorization": "Token token=supadupasecret"
              },
              data: $(this).serialize(),  ////parameters
              success: function(response){
                $("#todo li:last").data(response.data.id) ///response=data key///data&id value from server
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
