function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(function(){
  $.getJSON(
    'http://bot.nickvorobiov.com/leadgen-stats.php',
    { partner: getParameterByName('partner'), key: getParameterByName('key') },
    function(data) {
      var res = [];
      if (data.error) {
        $('#content').html('<p class="lead text-danger">' + data.error + '</p>');
      } else if (data.result) {
        data.result.map(function(board){
          res.push('<h1>' + board.name + '</h1>');
          board.lists.map(function(list){
            if (list.cards) {
              res.push(
                '<h4>' + list.name +
                ' <span class="badge">' + list.cards.length + '</span>' +
                '</h4>');
              res.push('<table class="table table-striped">');
              list.cards.map(function(card){
                res.push('<tr><td>');
                res.push(card.name);
                res.push('</td><td>');
                res.push(decodeURI(card.desc));
                res.push('</td></tr>');                
              })
              res.push('</table>');
            }
          })
        })

        $('#content').html(res.join(''));
      }
    }
  )
})