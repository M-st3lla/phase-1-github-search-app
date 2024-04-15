document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const searchInput = document.getElementById('search').value.trim();
      if (!searchInput) return;
  
      fetch(`https://api.github.com/search/users?q=${searchInput}`)
        .then(response => response.json())
        .then(data => {
          displayUsers(data.items);
        })
        .catch(error => console.error('Error fetching users:', error));
    });
  
    function displayUsers(users) {
      userList.innerHTML = '';
      users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <img src='${user.avatar_url}' alt='${user.login}' style='width: 50px; height: 50px;'>
          <a href='${user.html_url}' target='_blank'>${user.login}</a>
        `;
        listItem.addEventListener('click', function() {
          fetch(`https://api.github.com/users/${user.login}/repos`)
            .then(response => response.json())
            .then(data => {
              displayRepos(data);
            })
            .catch(error => console.error('Error fetching repositories:', error));
        });
        userList.appendChild(listItem);
      });
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = '';
      repos.forEach(repo => {
        const listItem = document.createElement('li');
        listItem.textContent = repo.full_name;
        reposList.appendChild(listItem);
      });
    }
  });
  