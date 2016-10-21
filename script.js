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
      <img src=${arr[i].photo}>
      </div>
      <h4>${arr[i].name}</h4>
      <div class="cardAboutDesc hideAboutDesc">
        <h5>${arr[i].aboutMe}</h5>
        <a href="${arr[i].githubLink}">GitHub</a>
        <a href="${arr[i].portfolioLink}">Portfolio</a>
        <a href="${arr[i].linkedInLink}">LinkedIn</a>
      </div>
    </div>
    `
    $('.gridWrap').append(cohortCard)

    // Shows class cohort description on mouse over
    // Hides class cohort description on mouse out
    $( "div.cohortCard" ).hover(function(e) {
      let currentDescDiv = $(e.currentTarget)[0].children[2];
      $(currentDescDiv).removeClass('hideAboutDesc');
    }, function(e) {
      let currentDescDiv = $(e.currentTarget)[0].children[2];
      $(currentDescDiv).addClass('hideAboutDesc');
    });
  }
}

const loadAbout = () => {
	let aboutDiv = `
		<div class="aboutDiv">
			<p class="aboutText">Hello there, how dew you dew? We are Cohort 14, the fourteenth full-time graduating class of the Nashville Software School.  After many party parrots, dad-jokes, beer tokens, confusing gifs, and countless puns involving Mountain Dew, we are now Junior MEAN Stack "Dew-velopers" ready to start our new careers. Our eternal thanks to NSS and especially our teachers Joe Shepherd and Scott Humphries, and our teaching assistants Callan Morrison, Mathew Ostrander, Caitlin Stein, and Christina Young. We will dew you proud.
			</p>
		</div>
	`
	$('.about').append(aboutDiv)
}

const loadPage = () => {
  let infoArr = []
  getCohortInfo()
  .then((data) => {
    infoArr = data.class

    infoArr.sort(function(a, b) {
      var nameA = a.name.split(' ').slice(-1)[0].toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.split(' ').slice(-1)[0].toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });

    populateGrid(infoArr)
    loadAbout()
  })
}


loadPage()
