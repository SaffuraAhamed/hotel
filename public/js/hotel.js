function func(event) {
  event.preventDefault();
  var input = document.querySelector("input").value;
  console.log(input);
  var myHeaders = new Headers();
  myHeaders.append(
    "X-RapidAPI-Key",
    "992299c2fdmsh2a2d95201b3e049p1cef05jsn1c1a54e73c22"
  );
  myHeaders.append("X-RapidAPI-Host", "hotels4.p.rapidapi.com");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

   fetch(
    `https://hotels4.p.rapidapi.com/locations/search?query="${input}"&locale=india`,
    requestOptions
   )
    .then((response) => response.json())
    .then((result) => {
      //console.log('hi',result)
      var table = document.getElementById("myTable");
      var listElem = "";
      hotel = document.getElementById("di");
      var jsonRes = result.suggestions[1].entities;
      console.log('Array.from(jsonRes).length',Array.from(jsonRes).length);
      console.log('Array.from(jsonRes).length',jsonRes.length);
      var arr= new Array(Array.from(jsonRes).length);
      Array.from(jsonRes).forEach((currentItem) => {
        listElem =
          listElem +
          `
       <tr>
       <td><button class="sib" value="${currentItem.name}" data-toggle="modal" data-target=".bd-example-modal-lg"
        onclick="funs('${currentItem.latitude}','${currentItem.longitude}','${currentItem.name}'); document.getElementById('btn').style.display = 'block'; " >${currentItem.name}</button></td>
        <td><button onclick="fav('${Array.from(jsonRes).length}','${currentItem.name}')" >add to favroite</button></td>
        <td><button onclick="remove('${Array.from(jsonRes).length}','${currentItem.name}')"  value="${currentItem.name}">remove from favroite</button></td>
        
       </tr> 
    `;
      });
      table.innerHTML = listElem;
      
    }
    
    )
    .catch((error) => console.log("error", error));
}
var arr=[]
var k=0
function fav(length, name){
  arr.push(name);      
  //showfav(length);
  
}
function showfav(){
  document.getElementById('tbName').innerHTML='';
  for(var i=0;i<arr.length;i++)
  {
    document.getElementById('tbName').innerHTML += `<tr><td>  ${arr[i]}  </td></tr>`;  
  }
}
function remove(length, value) {
  
  var index = arr.indexOf(value)
  if (index>-1) {
      arr.splice(index, 1);
    } 
    //showfav(length);
  
}
console.log(arr);

function funs(lat, long, name) {
  console.log("name", name);
  var allBtns = document.querySelectorAll(".sib");
  console.log(allBtns);
 
  allBtns.forEach((btn) => {
    console.log(btn.value);
    if (btn.value == name) {
      const element = document.createElement("div");
      let Cancelbtn = document.getElementById('btn');
      
      Cancelbtn.setAttribute("style", "height:30px; width:70px;  background:red;");
      element.setAttribute("id", "map");
      element.setAttribute("style", "height:400px; width:500px; ");
      if (btn.nextSibling != null) {
      } else {
        btn.after(element);
        element.after(Cancelbtn);
      }
    } else {
      if (btn.nextSibling != null) {
        btn.nextElementSibling.remove();
      }
    }
  });

  
  console.log(lat, long);
  var container = L.DomUtil.get("map");
  if (container != null) {
    container._leaflet_id = null;
  }

  var map = L.map("map").setView([lat, long], 11);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);

  var marker = L.marker([lat, long]).addTo(map);
}
