export function birthdayCancelClickHandler(e) {
  e.preventDefault();
  localStorage.setItem("birthday", null);

  const now = new Date();
  const target = new Date();

  target.setDate(now.getDate() + 1);
  target.setHours(0, 0, 0, 0);

  const delay = target - now;

  setTimeout(() => {
    localStorage.removeItem("birthday");
  }, delay);
}
