// On load
onload();

function onload() {
  // Hide the form
  const newSpeedrunForm = document.getElementById(`newSpeedrunForm`);
  newSpeedrunForm.style.display = `none`;

  // Set date in form as today as default value
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const localDatetime = `${year}-${
    month < 10 ? `0${month.toString()}` : month}-${
    day < 10 ? `0${day.toString()}` : day}T${
    hour < 10 ? `0${hour.toString()}` : hour}:${
    minute < 10 ? `0${minute.toString()}` : minute
  }`;

  document.getElementById(`date`).value = localDatetime;
}

document.getElementById(`showNewSpeedrunForm`).addEventListener(`click`, () => {
  const newSpeedrunForm = document.getElementById(`newSpeedrunForm`);
  if (newSpeedrunForm.style.display === `none`) {
    newSpeedrunForm.style.display = `block`;
  }
  else {
    newSpeedrunForm.style.display = `none`;
  }
});
