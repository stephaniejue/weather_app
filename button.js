$(document).ready(function() {

  $('.btn-toggle').click(function() {
      $(this).find('.btn').toggleClass('active');

      if ($(this).find('.btn-primary').length>0) {
      	$(this).find('.btn').toggleClass('btn-primary');
      }
      if ($(this).find('.btn-danger').length>0) {
      	$(this).find('.btn').toggleClass('btn-danger');
      }
      if ($(this).find('.btn-warning').length>0) {
      	$(this).find('.btn').toggleClass('btn-warning');
      }
      if ($(this).find('.btn-info').length>0) {
      	$(this).find('.btn').toggleClass('btn-info');
      }

      $(this).find('.btn').toggleClass('btn-default');

  });

  $('form').submit(function(){
  	alert($(this["options"]).val());
      return false;
  });

});
