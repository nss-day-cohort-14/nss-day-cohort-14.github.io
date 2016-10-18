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

const loadAbout = () => {
	let aboutDiv = `
		<div>
			<p class="aboutText">Hello there. How dew you dew? We are Cohort 14. We are the fourteenth full-time graduating class of the Nashville Software School. We started our journey in May 2016 learning programming languages like Javascript, AngularJS, Sass, and JQuery. After we presented our frontend capstone projects in August, we proceeded to study Node.Js along with various database and server programs. We completed our final capstones in November. After many party parrots, dad-jokes, beer tokens, confusing gifs, and countless puns involving Mountain Dew, we are now Junior MEAN Stack "Dew-velopers" ready to start our new careers in the modern world. Our eternal thanks to our teachers Joe Shepherd and Scott Humphries, our teaching assistants Callan Morrison, Mathew Ostrander, Caitlin Stein, and Christina Young, and especially to everyone at NSS. We will dew you proud.
			</p>
		</div>
	`
	$('.about').append(aboutDiv)
}

const loadPage = () => {
  let infoArr = []
  getCohortInfo()
  .then((data) => {
    console.log("data: ", data)
    infoArr = data.class
    populateGrid(infoArr)
    loadAbout()
  })
}


loadPage()
