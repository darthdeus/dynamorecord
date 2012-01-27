
$(function() {
  $.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name] !== undefined) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
  };

  $("form button.create").click(function(e) {
    alert($("form").serialize());
    e.preventDefault();
  });

  $("form button.update").click(function(e) {
    var data = {
      name: $("#name").val(),
      tags: $("#tags").val(),
    }

    var id =$("#task_id").val();
    var self = $(this);

    self.attr("disabled", "disabled");

    $.post('/update/' + id, data, function(response) {
      console.log(response);
      self.removeAttr("disabled");
    });

    e.preventDefault();
  });


  $("button.edit").click(function(e) {
    var id = $(this).parents('tr').attr('id')
    var self = $(this);

    self.attr("disabled", "disabled");

    $.get('/get/' + id, function(data) {
      $("#task_id").val(data.id);
      $("#name").val(data.name);
      $("#tags").val(data.tags);

      $(".btn.update").show();
      $(".btn.create").removeClass("primary");

      self.removeAttr("disabled");
      console.log("loaded data", data);
    });

  
    // e.preventDefault();
  });

  $("button.update").hide();
});
