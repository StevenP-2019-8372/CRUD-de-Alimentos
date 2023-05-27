let foodForm = document.querySelector('#foodForm');
let foodTable = document.querySelector('#foodTable');
let submitButton = document.querySelector('input[type=submit]');
let editingRow = null;

loadFoods();

foodForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let name = document.querySelector('#name').value;
    let calories = document.querySelector('#calories').value;
    if (editingRow) {
        updateFood(editingRow, name, calories);
        editingRow = null;
        submitButton.value = 'Agregar';
    } else {
        addFood(name, calories);
    }
    foodForm.reset();
});

function addFood(name, calories) {
    let row = foodTable.insertRow(-1);
    let nameCell = row.insertCell(0);
    let caloriesCell = row.insertCell(1);
    let actionsCell = row.insertCell(2);

    nameCell.innerHTML = name;
    caloriesCell.innerHTML = calories;

    let editButton = document.createElement('button');
    editButton.innerHTML = 'Editar';
    editButton.addEventListener('click', () => {
        editFood(row);
    });
    actionsCell.appendChild(editButton);

    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Eliminar';
    deleteButton.addEventListener('click', () => {
        deleteFood(row);
    });
    actionsCell.appendChild(deleteButton);

    saveFoods();
}

function editFood(row) {
    let name = row.cells[0].innerHTML;
    let calories = row.cells[1].innerHTML;

    document.querySelector('#name').value = name;
    document.querySelector('#calories').value = calories;

    editingRow = row;
    submitButton.value = 'Actualizar';
}

function updateFood(row, name, calories) {
    row.cells[0].innerHTML = name;
    row.cells[1].innerHTML = calories;
    
    saveFoods();
}

function deleteFood(row) {
    row.remove();
    
    saveFoods();
}

function saveFoods() {
  let foods = [];
  for (let i=1; i<foodTable.rows.length; i++) {
      let row = foodTable.rows[i];
      let name = row.cells[0].innerHTML;
      let calories = row.cells[1].innerHTML;
      foods.push({name: name, calories: calories});
  }
  localStorage.setItem('foods', JSON.stringify(foods));
}

function loadFoods() {
  let foodsJSON = localStorage.getItem('foods');
  if (foodsJSON) {
      let foods = JSON.parse(foodsJSON);
      for (let food of foods) {
          addFood(food.name, food.calories);
      }
  }
}
