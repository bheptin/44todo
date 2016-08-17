$(document).ready(function() {
    var site = "https://fathomless-woodland-51903.herokuapp.com"


    $(document).ready(()=> {
      ///getting information from server and turning it over to site in object notation
      $.getJSON({
        url: `${site}/todos`,
        headers: {
          "Authorization": "Token token=supadupasecret"
        },
        success: (response) => {
          var taskHTML = response.data.map((task) => `<li data-id=${task.id}> ${task.attributes.todo}
          <input class ="checked" type="checkbox" name="todo[isComplete]">
          <button>Delete</button></li>`);

          ///adding the server info to the todo ul
          $("#todo").append(taskHTML.join("\n"));

        }
      });

      $("form").submit(function(event){
        $.post({
          url: `${site}/todos`,
          headers: {
            "Authorization": "Token token=supadupasecret"
          },
          data: $(this).serialize(),  ////parameters
          success: function(response){
            $("#todo li:last").data("id", response.attributes.id); ///response=data key///data&id value from server

          },

        });
        var moreHTML = `<li>${$(this).find("input").val()} <input class ="checked" type="checkbox" name="todo[isComplete]">
        <button>Delete</button></li>`;
        $("#todo").append(moreHTML);  ////this makes an html skeleton "this" is the FORM

        event.preventDefault(); ///keeps form data from being lost on button click
        $("input").val("");

      });

    })
})
