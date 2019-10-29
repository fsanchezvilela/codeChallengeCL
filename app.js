//Souce DataBase list
const PersonList = [];

// size of the contect list
let cantidad = 4;

//create the html dom manipulation
function createContactHTML(data, index) {
  //destructure data object
  const {
    photoUrl,
    name,
    phone,
    address
  } = data;
  //get the dom card
  let card = $(`#item${String(index + 1)}`).children();

  //IMG DOM MANIPULATION (JQUERY)
  let imgCard = card[0].children;
  $(imgCard[0]).attr('src', photoUrl);

  //Name DOM Manipulation (HTML Collection)
  let nameCard = (card[1].children[0].innerText = name);

  //Window ZOOM manipulation (Target JQUERY)
  $(`#persona${String(index + 1)} .card .card-header`).attr('src', photoUrl);
  $(`#persona${String(index + 1)} .card .card-body .name-window`).text(name);
  $(`#persona${String(index + 1)} .card .card-body .phone-window`).text(phone);
  $(`#persona${String(index + 1)} .card .card-body .address-window`).text(
    address
  );

  //return valid data;
  return card;
}
//Create Promise Person Function
async function fetchPersonData() {
  let data = await fetch('https://uinames.com/api/?ext').then(value => {
    return value.json();
  });

  let obj = {
    name: data.surname,
    phone: data.phone,
    photoUrl: data.photo,
    address: data.region
  };

  PersonList.push(obj);
  return PersonList;
}

//main async function to get data and later append dom
async function main() {
  //Create the random DB
  while (cantidad !== 0) {
    await fetchPersonData();
    cantidad--;
  }
  return PersonList;
}

//APPEND THE DATA TO THE DOM. 
main().then(value => {
  value.forEach((data, index) => {
    createContactHTML(data, index);
    $('#contact-list').css('opacity', '1');
  });
});

//get id of click event
let id;
const editionBox = document.querySelector('#editionBox');


//WINDOW EVENTS 
//Event to create the form
window.addEventListener('mousedown', function (e) {
  //beware bubble and do delegation
  if (e.target.className === 'edit') {
    //select the value edit and create form
    if (e.target.value === 'Edit') {
      $('.card-body #editionBox').html(
        `<input type="text" id="nombre" name="nombre" value="" placeholder="New Name"><input type="text" id="phone" value="" name="phone" placeholder="New Phone"><input type="text" id="address" value="" name="address" placeholder="New address">`
      );
    } else {
      // submit the form in de dom
      //change the text
      e.target.value = 'Edit';
      //edit the info
      let card = $('#item' + String(id));
      let personaCard = $('#persona' + String(id));
      //get the info

      let $personaCard = personaCard
        .children()
        .children()
        .children();

      //Set the new values
      $personaCard[0].innerText = nameVal || $personaCard[0].innerText;
      $personaCard[1].innerText = phoneVal || $personaCard[1].innerText;
      $personaCard[2].innerText = addressVal || $personaCard[2].innerText;
      card.children().children()[1].innerText = nameVal || card.children().children()[1].innerText;

      //clear the form
      $('.card-body #editionBox').html('')
    }
  }

});

//Event to get ID of the card
window.addEventListener('mouseover', function (e) {
  if (e.target.className === 'button-primary') {
    id = e.target;
    //get the id value
    id = id.attributes['1'].nodeValue;
    //clear tag
    id = Number(id.replace(/#persona/gim, ''));
    //get id

  }
});

//Event to set the value key in inputs
window.addEventListener('input', function (e) {
  $(".edit").val('Done');
  switch (e.target.id) {
    case 'nombre':
      nameVal = e.target.value || ""
      cardNameVal = e.target.value || ""
      break;
    case 'phone':
      phoneVal = e.target.value || ""
      break;
    case 'address':
      addressVal = e.target.value || ""
      break;
  }
})