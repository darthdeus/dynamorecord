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

  $("form button").click(function(e) {
    alert($("form").serialize());
    e.preventDefault();
  });

  $("button.edit").click(function(e) {
    var id = $(this).parents('tr').attr('id')

    $.get('/get/' + id, function(data) {
      $("#name").val(data.name);
      $("#tags").val(data.tags);
      $("#info").val(data.info);
    });

    e.preventDefault();
  });
});
