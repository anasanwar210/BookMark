var markName  = document.getElementById("siteName"),
    markURL   = document.getElementById("siteURL"),
    bookMarks = [];

    if(localStorage.getItem("url") == null){
      bookMarks = [];
    }else{
      bookMarks = JSON.parse(localStorage.getItem("url"));
      displayURL();
    }

  function addURL(){
    var nameValid = /^[A-Za-z]{4,35}$/;
    var urlValid  = /^(https:\/\/|http:\/\/)/;

    if(markName.value=="" && markURL.value==""){
      document.getElementById("validMsgName").innerHTML 
        = `<p class="mb-1">Name is required</p>`;
      document.getElementById("validMsgUrl").innerHTML 
        = `<p class="mb-1">URL is required</p>`;
    }

    
    
    if(nameValid.test(markName.value) && urlValid.test(markURL.value)){      
      var getName = document.getElementById("siteName").value;
      var getURL  = document.getElementById("siteURL").value;
      
      allMarkers = {name: getName , sites: getURL};
      
      bookMarks.unshift(allMarkers);
      localStorage.setItem("url" , JSON.stringify(bookMarks));
  
      // console.log(test)
  
      displayURL();
      
      clearData();
    }else{
      document.getElementById("MsgName").innerHTML
        =`<p class="mb-1">The Name Must Begin With A Capital Letter And Then Any Letters Or Numbers Provided That They Do not Skip 35</p>` 
      
      document.getElementById("MsgUrl").innerHTML
        =`<p class="mb-1">The URL Must Begin {https://} OR {http://}</p>`
    }
  }


  function clearData(){
    markName.value = ``;
    markURL.value = ``;
  }

  function deleteURL(Delete){
    bookMarks.splice(Delete , 1);
    localStorage.setItem("url" , JSON.stringify(bookMarks));

    displayURL();
  }

  function updateURL(Update){
    markName.value = bookMarks[Update].name;
    markURL.value  = bookMarks[Update].sites;

    bookMarks.splice(Update , 1);
    
    localStorage.setItem("url" , JSON.stringify(bookMarks))

    displayURL();
  }

  function copyTXT(Copy){
    // localStorage.getItem()
    // markURL.select()
    document.execCommand(bookMarks[Copy].sites);
  }
  
  function displayURL(){
    var markerStorge= ``;
    for(i=0 ; i<bookMarks.length ; i++){
      markerStorge += 
        `
          <div class="bookmarker py-4 px-3 mt-3 mx-4 d-flex align-items-center justify-content-start">
            <h3 id="markName" class="w-25 text-left font-weight-bold">${bookMarks[i].name}</h3>
            <div class="butns">
              <a href="${bookMarks[i].sites}" target="_blank" class="btn btn-primary">Visit</a>
              <button onclick="copyTXT(${i})" class="btn btn-outline-primary">Copy</button>
              <button class="btn btn-warning" onclick="updateURL(${i})">Update</button>
              <button class="btn btn-danger" onclick="deleteURL(${i})">Delete</button>
            </div>
          </div>
        `
    }

    document.getElementById("showURLS").innerHTML = markerStorge;
  }