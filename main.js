$(document).ready(function() {
    var site = "https://fathomless-woodland-51903.herokuapp.com"

    $(document).ready(()=> { ///used when doc is ready to be used
      $.getJSON({ ////to get html and turn it into JSON///method (taking arguements)
        url: `${site}/todos`,  ////key of JSON ${site} = string interpilation
        headers: {  ////key of JSON headers key is used for permission
          "Authorization": "Token token=supadupasecret"
        },
        success: (response) => {   ///key of JSON///when data is sent, work this
          var todoHTML = response.data.map((todo) => `<li data-id=${todo.id}>${todo.attributes.name} : ${todo.attributes.description}`);
          $("#todo").append(todoHTML.join("\n")); ///adds unordered list to
        }
      });
      $("form").submit(function(event){ ////setting form for url
        $.post({
          url: `${site}/todos`,
          headers: {
            "Authorization": "Token token=supadupasecret"
          },
          data: $(this).serialize(),  ////parameters
          success: function(response){
            $("#todo li:last").data("id", response.data.id) ///response=data key///data&id value from server

          }
        });

        var todoHTML = `<li>${$(this).find("textarea").val()}
        <input type="checkbox" name="selection"></li>`;
        $("#todo").append(todoHTML);  ////this makes an html skeleton "this" is the FORM

        event.preventDefault(); ///keeps form data from being lost on button click
        $("textarea").val("");

      })
  ///we want to click on upvote and keep track of the number
  ///and have the number persist when the page reloads
  ///so we need communication with hte server
  ///that requires a url, and HTTP method (GET/POST/PUT/DELETE)
  ///the server needs to know what thing is being upvoted
  ///for instance, if I'm upvoting the language with ID=3
  ///URL could be "/languages/3/upvote"
  ///so I need to be able to figure out the ID value for a language
  ///which I can do if it's in the HTML somewhere
      // $("#todo").on("click", ".upvote", function(event){
      //   var self = $(this); ///this is the callback funtion of the thing that got clicked
      //   $.post({
      //     url: `${site}/todos/${self.parent().data("id")}/upvote`,
      //     headers: {
      //       "Authorization": "Token token=supadupasecret"
      //     },
      //     success: function(data){   ///what to do with upvote response
      //       self.text(`Upvote (${data})`)
      //     }
      //   })
      // })
      // $("#languages").on("click", ".downvote", function(event){
      //   var self = $(this); ///this is the callback funtion of the thing that got clicked
      //   $.post({
      //     url: `${site}/languages/${self.parent().data("id")}/downvote`,
      //     headers: {
      //       "Authorization": "Token token=supadupasecret"
      //     },
      //     success: function(data){   ///what to do with upvote response
      //       self.text(`Downvote (${data})`)
      //     }
      //   })
      // })
      // $("#languages").on("click", ".Novote", function(event){
      //   var self = $(this); ///this is the callback funtion of the thing that got clicked
      //
      //   $.ajax({
      //     url: `${site}/languages/${self.parent().data("id")}`,
      //     headers: {
      //       "Authorization": "Token token=supadupasecret"
      //     },
      //     success: function(data){   ///what to do with upvote response
      //       self.parent().remove();
      //     },
      //     method: "DELETE"
      //   })
      // })
    })
  })
