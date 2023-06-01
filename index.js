async function getUsers() {
  let url = 'data.json';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
const ul = document.querySelector('ul');
const li = Array.from(ul.children);
const arr = ["daily","weekly","monthly"];
for (let i = 0; i < arr.length; i++) {
  const span = li[i].querySelector('span');
  const box = span.closest('li');
  span.addEventListener('click', e => {
    li.forEach(item => {item.classList.remove('active')})
    box.classList.add('active');
    renderUsers(arr[i]);
  })
}
async function renderUsers(li) {
  let data = await getUsers();
  let html = '';
  data.forEach(data => {
      const title = `${data.title}`.toLowerCase();
      let hours = data.timeframes.weekly.previous;

      if (li === 'daily') {
        hours = data.timeframes.daily.previous;
      } else if (li === 'weekly') {
        hours = data.timeframes.weekly.previous;
      } else if (li === 'monthly') {
        hours = data.timeframes.monthly.previous;
      }
      let htmlSegment = `
      <div class="card">
        <div>
          <img src="img/icon-${title}.svg" alt="">
        </div>
        <div>
          <div>
            <h3>${data.title}</h3> <i></i>
          </div>
          <div>
            <h2>${hours} hours</h2>
            <span>Last-week 36 hours</span>
          </div>
        </div>
      </div>
      
      `;

      html += htmlSegment;
  });

  let container = document.querySelector('.grid');
  container.innerHTML = html;
}

renderUsers();