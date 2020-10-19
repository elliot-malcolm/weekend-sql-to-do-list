$(document).ready(onReady);

function onReady() {
  console.log('hello from jquery');
  addListItemClick();
  getList();
}

function addListItemClick() {
  $( '#listInBtn' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    let listItemObject = {
      item: $('#listIn').val(),
    };
    console.log('List Item is', listItemObject);
    sendListItem( listItemObject );
  }); 
}

function getList(){
  let el = $('#viewList');
  el.empty();
  console.log( 'in getList' );
  $.ajax( {
    method: 'GET',
    url: '/todolist'
  }).then( function (response) {
    console.log('back from server with', response);
    for (let i = 0; i < response.length; i++) {
       el.append(`
          <tr>
            <td>${response[i].item}</td>
          </tr>
      `)
    }
  }).catch(function(error) {
    console.log('error', error);
    res.sendStatus(500)
  });

