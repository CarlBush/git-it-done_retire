var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var repoSearchTerm = document.querySelector("#repo-search-term");
var repoContainerEl = document.querySelector("#repos-container");



var formSubmitHandler = function(event){
    event.preventDefault();
    var username = nameInputEl.value.trim();

    if (username){
        getUsersRepos(username);
        nameInputEl.value = "";

    } else{
        alert("Please enter a GitHub username");
    }
    console.log(event);
};

var displayRepos = function(repos, searchTerm){
    if(repos.length === 0){
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    console.log(repos);
    console.log(searchTerm);
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    //loop for repos
    for (var i = 0; repos.length; i++){
        //format repo name to include name/owner/login
        var repoName = repos[i].owner.login + "/" + repos[i].name;
        // create a div for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center"
        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;
        // append to container
        repoEl.appendChild(titleEl);
        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //CHECK TO SEE IF REPO HAS ERRORS
        if(repos[i].open_issues_count >0){
            statusEl.innerHTML="<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        }
        else{
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        repoEl.appendChild(statusEl);
        // append container to the dom
        repoContainerEl.appendChild(repoEl);
    }


};

var getUsersRepos = function(user) {
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
          response.json().then(function(data) {
            displayRepos(data, user);
          });
        } else {
          alert("Error: GitHub User Not Found");
        }
    })
    .catch(function(error) {
        alert("unable to connect to Github");
    });
}

userFormEl.addEventListener("submit", formSubmitHandler);