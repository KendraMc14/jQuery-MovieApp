// id to keep track of which element to remove
let currentId = 0;

// list of all of movies in memory
let moviesList = [];

$(function() {
  // when you click the delete button, remove the closest parent tr
  $("#new-movie-form").on("submit", function(evt) {
    evt.preventDefault();
    let title = $("#title").val();
    let rating = $("#rating").val();

    let movieData = { title, rating, currentId };
    const HTMLtoAppend = createMovieDataHTML(movieData);

    currentId++
    moviesList.push(movieData);

    $("#movie-table-body").append(HTMLtoAppend);
    $("#new-movie-form").trigger("reset");
  });

  // when the delete is clicked, remove the closest parent tr and remove from array of movies
  $("tbody").on("click", ".btn.btn-danger", function(evt) {
    // find index where movie is
    let indexToRemoveAt = moviesList.findIndex(movie => movie.currentId === +$(evt.target).data("deleteId"))
    
    // remove from movie array
    moviesList.splice(indexToRemoveAt, 1)

    // remove from DOM
    $(evt.target)
      .closest("tr")
      .remove();
    
  });

  // arrow click
  $(".fas").on("click", function(evt) {
    
    // arrow sorting directions
    let direction = $(evt.target).hasClass("fa-sort-down") ? "down" : "up";
    let keyToSortBy = $(evt.target).attr("id");
    let sortedMovies = sortBy(moviesList, keyToSortBy, direction);
    
    // empty the table
    $("#movie-table-body").empty();

    // make a new row
    for (let movie of sortedMovies) {
      const HTMLtoAppend = createMovieDataHTML(movie);
      $("#movie-table-body").append(HTMLtoAppend);
    }

    // toggle with the arrow
    $(evt.target).toggleClass("fa-sort-down");
    $(evt.target).toggleClass("fa-sort-up");
  });
});

// new array of objects, key, and sorting
function sortBy(array, keyToSortBy, direction) {
  return array.sort(function(a, b) {
    if (keyToSortBy === "rating") {
      a[keyToSortBy] = +a[keyToSortBy];
      b[keyToSortBy] = +b[keyToSortBy];
    }
    if (a[keyToSortBy] > b[keyToSortBy]) {
      return direction === "up" ? 1 : -1;
    } else if (b[keyToSortBy] > a[keyToSortBy]) {
      return direction === "up" ? -1 : 1;
    }
    return 0;
  });
}

// this returns string of HTML
function createMovieDataHTML(data) {
  return `
    <tr>
      <td>${data.title}</td>
      <td>${data.rating}</td>
      <td>
        <button class="btn btn-danger" data-delete-id=${data.currentId}>
          Delete
        </button>
      </td>
    <tr>
  `;
}
