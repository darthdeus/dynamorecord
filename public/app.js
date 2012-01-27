
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

  if (console.log == undefined) {
    console.log = function() {};
  }

  $("form button.create").click(function(e) {
    var data = {
      name: $("#name").val(),
      tags: $("#tags").val(),
    }
    
    var id = $("#task_id").val();
    var self = $(this);

    // disable the button so it can't be clicked again until the request is finished
    self.attr("disabled", "disabled");
    
    $.post('/create', data, function(response) {
      // reenable and render new task
      self.removeAttr("disabled");

      // create placeholder when all items are deleted to clone from
      var clone = $("tr:last").clone();
      clone.appendTo($("tbody"))
      
      clone.attr("id", response.id.replace('.', '_'));
      clone.children(".name").html(response.name);
      clone.children(".tags").html(response.tags);

      $("form")[0].reset();
    });
    
    e.preventDefault();
  });

  $("form button.update").click(function(e) {
    var data = {
      name: $("#name").val(),
      tags: $("#tags").val(),
    }

    var id = $("#task_id").val();
    var self = $(this);

    // disable the button so it can't be clicked again until the request is finished
    self.attr("disabled", "disabled");

    $.post('/update/' + id, data, function(response) {
      console.log(response);
      self.removeAttr("disabled");

      var task = $("#task" + response.id.replace('.', '_'));
      task.children(".name").html(response.name);
      task.children(".tags").html(response.tags);
    });

    e.preventDefault();
  });

  $("button.delete").live("click", function(e) {
    var parent = $(this).parents('tr').attr('id');
    var id = parent.replace("task", "").replace("_", ".");
    var self = $(this);

    self.attr("disabled", "disabled");
    $.post('/delete/' + id, function(data) {
      self.parents('tr').remove();
      console.log("removed", $(parent));
    });
  });

  $("button.edit").live("click", function(e) {
    var id = $(this).parents('tr').attr('id').replace("task", "").replace("_", ".");
    var self = $(this);

    // disable the button so it can't be clicked again until the request is finished
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

    e.preventDefault();
  });

  $("button.update").hide();
});
