$(document).ready(onReady);

function onReady() {
  console.log('hello from jquery');
  // new to-do item
  $( '#listInBtn' ).on( 'click', addListItem);
  // check off item as complete
  $('#listItemBody').on('click', '.completeBtn', completeToDo)
  $('#listItemBody').on('click', '.deleteBtn', deleteItem)

  getList();
};

function getList(){
  console.log( 'in getList' );
  $.ajax( {
    method: 'GET',
    url: '/todolist'
  }).then( function (response) {
    console.log('back from server with', response);
    let el = $('#listItemBody');
    el.empty();
    for (let listItem of response) {
      let cssClass, disabledAttr;
      if (listItem.yesComplete) {
        cssClass = 'complete'
        disabledAttr = 'disabled';
      }
      else {
        cssClass = 'incomplete';
        disabledAttr = '';
      }
       el.append(`
          <li data-id=${listItem.id} class="${cssClass}">
            ${listItem.list_item}
            <button class="completeBtn" >Complete</button>
            <button class="deleteBtn" >Delete</button>
          </li>
      `)
    }
  }).catch(function(error) {
    console.log('error', error);
    res.sendStatus(500)
  });
}

function addListItem() 
{
    let listItem = {
    item: $('#listIn').val()
    }
    console.log( 'in addListItem on click', listItem );
    $.ajax({
        method: 'POST',
        url: '/todolist',
        data: listItem
        }).then(function(response){
          console.log('addListsuccess', response);
          $('#listIn').val('');
        }).catch(function(error) {
          console.log('error', error);
          res.sendStatus(500)
        })
        getList();
};

function completeToDo() {
  console.log('complete button clicked');

  let itemId = $(this).closest('li').data('id')

  $.ajax({
    method: 'PUT',
    url: `/todolist/${itemId}`,
    data: {
      yesComplete: true
    }
  }).then(function(response){
    console.log('PUT /todo/:id', response);
    getList();
    $('#listInBtn').val('');
  }).catch(function(error) {
    console.log('error', error);
    res.sendStatus(500)
  })

}

function deleteItem() {
  console.log('clicked');
  let itemId = $(this).closest('li').data('id');
  $.ajax({
    method: 'DELETE',
    url: `/todolist/${itemId}`
  }).then( function(response){
    console.log(response);
    getList();
}).catch(function(error){
    console.log('error', error);
});

}