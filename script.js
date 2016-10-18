'use strict';

const getCohortInfo = () => {
  return new Promise((resolve, reject) => {
	    $.ajax({
	      url: "class.json",
	    }).done(function(data) {
	      resolve(data)
	    }).fail(function(xhr, status, error) {
	      reject(error)
	    })
	  })
}

const populateGrid = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let cohortCard = `
    <div class='cohortCard'>
      <div class="cardImg">
      </div>
      <h4>${arr[i].name}</h4>
      <h5>${arr[i].aboutMe}</h5>
      <a href="${arr[i].githubLink}">GitHub</a>
      <a href="${arr[i].portfolioLink}">Portfolio</a>
      <a href="${arr[i].linkedInLink}">LinkedIn</a>
    </div>
    `
    $('.gridWrap').append(cohortCard)
  }
}


const loadInfo = () => {
  let infoArr = []
  getCohortInfo()
  .then((data) => {
    console.log("data: ", data)
    infoArr = data.class
    populateGrid(infoArr)
  })
}

loadInfo()
