const firstTrimesterList = document.getElementById('first-trimester-list');
const secondTrimesterList = document.getElementById('second-trimester-list');
const thirdTrimesterList = document.getElementById('third-trimester-list');

// First Trimester Diet
const firstTrimesterDiet = [
  'Whole grains',
  'Fruits and vegetables',
  'Lean proteins such as chicken, fish, and beans',
  'Dairy products like milk, cheese, and yogurt',
  'Foods high in folic acid, such as spinach, kale, and fortified cereals',
  'Iron-rich foods like lean red meat, beans, and fortified cereals'
];

// Loop through the array and create a list item for each item
firstTrimesterDiet.forEach(item => {
  const li = document.createElement('li');
  li.textContent = item;
  firstTrimesterList.appendChild(li);
});

// Second Trimester Diet
const secondTrimesterDiet = [
  'Whole grains',
  'Fruits and vegetables',
  'Lean proteins such as chicken, fish, and beans',
  'Dairy products like milk, cheese, and yogurt',
  'Foods high in calcium, such as broccoli, kale, and fortified cereals',
  'Foods high in vitamin D, such as fatty fish, egg yolks, and fortified cereals'
];

// Loop through the array and create a list item for each item
secondTrimesterDiet.forEach(item => {
  const li = document.createElement('li');
  li.textContent = item;
  secondTrimesterList.appendChild(li);
});

// Third Trimester Diet
const thirdTrimesterDiet = [
  'Whole grains',
  'Fruits and vegetables',
  'Lean proteins such as chicken, fish, and beans',
  'Dairy products like milk, cheese, and yogurt',
  'Foods high in iron, such as lean red meat, beans, and fortified cereals',
  'Foods high in vitamin C, such as citrus fruits, strawberries, and bell peppers'
];

// Loop through the array and create a list item for each item
thirdTrimesterDiet.forEach(item => {
  const li = document.createElement('li');
  li.textContent = item;
  thirdTrimesterList.appendChild(li);
});
