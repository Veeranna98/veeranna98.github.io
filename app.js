let divMenu = document.createElement("div");
let divContent = document.createElement("div");
divMenu.classList.add("divMenu");
divContent.classList.add("divContent");
let userId;
const validateUser = async () => {
  userId = txtUserId.value;
  userName.innerHTML = await getName(userId);
  container.innerHTML = "";
  let str = `
      <p onclick='showData(1)'><i class="bi bi-bookmarks-fill"></i> Feeds [All]</p>
      <p onclick='showData(2)'><i class="bi bi-file-earmark-post-fill"></i></i> My Posts</p>
      <p onclick='showData(3)'><i class="bi bi-journal-album"></i> My Albums</p>
      <p onclick='showData(4)'><i class="bi bi-person"></i> My Profile</p>
      <p onclick='showData(5)'><i class="bi bi-door-open"></i> Logout</p>
      `;
  divMenu.innerHTML = str;
  container.append(divMenu);
  divContent.innerHTML = await getFeeds();
  container.append(divContent);
};

const showData = async (pageId) => {
  if (pageId === 1) {
    divContent.innerHTML = await getFeeds();
  } else if (pageId === 2) {
    divContent.innerHTML = await getPosts();
  } else if (pageId === 3) {
    divContent.innerHTML = await getAlbums();
  } else if (pageId === 4) {
    divContent.innerHTML = await getProfile();
  } else if (pageId === 5) {
    location.reload();
  }
};

const getFeeds = async () => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const json = await fetchData(url);
  let str = "<div><h2>Feeds [All Posts]</h2>";
  json.map((element) => {
    str += `<p><b>User:</b>${element.userId}</p>
    <p><b>Title:</b>${element.title}</p>
    <p><b>Body:</b>${element.body}</p>
    <p onclick=getComments(${element.id})>View Comments</p>
    <hr>
`;
  });
  str += "</div";
  return str;
};

const getPosts = async () => {
  const url = `https://jsonplaceholder.typicode.com/posts/?userId=${userId}`;
  const json = await fetchData(url);
  let str = "<div><h2>My Posts</h2>";
  json.map((element) => {
    str += `
        <p><b>Title:</b>${element.title}</p>
        <p><b>Body:</b>${element.body}</p>
        <p onclick=getComments(${element.id})>View Comments</p>
        <hr>
`;
  });
  str += "</div";
  return str;
};

const getAlbums = async () => {
  const url = `https://jsonplaceholder.typicode.com/albums/?userId=${userId}`;
  const json = await fetchData(url);
  let str = "<div><h2>My Albums</h2>";
  json.map((element) => {
    str += `<p onclick='getPhotos(${element.id})'>${element.title}</p>
 `;
  });
  str += "</div";
  return str;
};

const getPhotos = async (albumId) => {
  const url = `https://jsonplaceholder.typicode.com/photos/?albumId=${albumId}`;
  const json = await fetchData(url);
  let str = `<div><h2>Photos of Album Id: ${albumId}</h2>`;
  json.map((element) => {
    str += `<div class='photos'><a href='${
      element.url
    }' target=_blank><img src='${element.thumbnailUrl}'></a>
    <p>${element.title.slice(0, 20)}...</p></div>
    `;
  });
  str += "</div";
  divContent.innerHTML = str;
};

const getProfile = async () => {
  const url = `https://jsonplaceholder.typicode.com/users/${userId}`;
  const json = await fetchData(url);
  let str = "<div><h2>My Profile</h2>";
  str += `<p><b>Name:</b>${json.name}</p>
        <p><b>Email:</b>${json.email}</p>
        <p><b>Phone:</b>${json.phone}</p>
        <p><b>Address:</b>${json.address.suite},${json.address.street},${json.address.city}</p>
 `;
  str += "</div";
  return str;
};

const getName = async (id) => {
  const url = `https://jsonplaceholder.typicode.com/users/${userId}`;
  const json = await fetchData(url);
  return json.name;
};

const getComments = async (postId) => {
  const url = `https://jsonplaceholder.typicode.com/comments/?postId=${postId}`;
  const json = await fetchData(url);
  let str = `<div><h2>View Comments on Post Id: ${postId}</h2>`;
  json.map((element) => {
    str += `<p><b>${element.email}:</b>
    ${element.body}</b>
    <hr>`;
  });
  str += "</div";
  divContent.innerHTML = str;
};

const fetchData = async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};
