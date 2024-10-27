"use strict";

var apiKey = "10cf9ce4a63505fa38196e2544e87774";
var imgApi = "https://image.tmdb.org/t/p/w1280";
var searchUrl = "https://api.themoviedb.org/3/search/movie?api_key=".concat(apiKey, "&query=");
var form = document.getElementById("search-form");
var query = document.getElementById("search-input");
var result = document.getElementById("result");
var page = 1;
var isSearching = false; // Fetch JSON data from url

function fetchData(url) {
  var response;
  return regeneratorRuntime.async(function fetchData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch(url));

        case 3:
          response = _context.sent;

          if (response.ok) {
            _context.next = 6;
            break;
          }

          throw new Error("Network response was not ok.");

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          return _context.abrupt("return", _context.sent);

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", null);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
} // Fetch and show results based on url


function fetchAndShowResult(url) {
  var data;
  return regeneratorRuntime.async(function fetchAndShowResult$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(fetchData(url));

        case 2:
          data = _context2.sent;

          if (data && data.results) {
            showResults(data.results);
          }

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
} // Create movie card html template


function createMovieCard(movie) {
  var poster_path = movie.poster_path,
      original_title = movie.original_title,
      release_date = movie.release_date,
      overview = movie.overview;
  var imagePath = poster_path ? imgApi + poster_path : "./img-01.jpeg";
  var truncatedTitle = original_title.length > 15 ? original_title.slice(0, 15) + "..." : original_title;
  var formattedDate = release_date || "No release date";
  var cardTemplate = "\n        <div class=\"column\">\n            <div class=\"card\">\n                <a class=\"card-media\" href=\"./img-01.jpeg\">\n                    <img src=\"".concat(imagePath, "\" alt=\"").concat(original_title, "\" width=\"100%\" />\n                </a>\n                <div class=\"card-content\">\n                    <div class=\"card-header\">\n                        <div class=\"left-content\">\n                        <h3 style=\"font-weight: 600\">").concat(truncatedTitle, "</h3>\n                        <span style=\"color: #12efec\">").concat(formattedDate, "</span>\n                        </div>\n                    <div class=\"right-content\">\n                        <a href=\"").concat(imagePath, "\" target=\"_blank\" class=\"card-btn\">See Cover</a>\n                    </div>\n                </div>\n                <div class=\"info\">\n                    ").concat(overview || "No overview yet...", "\n                </div>\n            </div>\n        </div>\n    </div>\n    ");
  return cardTemplate;
} // Clear result element for search


function clearResults() {
  result.innerHTML = "";
} // Show results in page


function showResults(item) {
  var newContent = item.map(createMovieCard).join("");
  result.innerHTML += newContent || "<p>No results found.</p>";
} // Load more results


function loadMoreResults() {
  var searchTerm, url;
  return regeneratorRuntime.async(function loadMoreResults$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (!isSearching) {
            _context3.next = 2;
            break;
          }

          return _context3.abrupt("return");

        case 2:
          page++;
          searchTerm = query.value;
          url = searchTerm ? "".concat(searchUrl).concat(searchTerm, "&page=").concat(page) : "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=".concat(apiKey, "&page=").concat(page);
          _context3.next = 7;
          return regeneratorRuntime.awrap(fetchAndShowResult(url));

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
} // Detect end of page and load more results


function detectEnd() {
  var _document$documentEle = document.documentElement,
      scrollTop = _document$documentEle.scrollTop,
      clientHeight = _document$documentEle.clientHeight,
      scrollHeight = _document$documentEle.scrollHeight;

  if (scrollTop + clientHeight >= scrollHeight - 20) {
    loadMoreResults();
  }
} // Handle search


function handleSearch(e) {
  var searchTerm, newUrl;
  return regeneratorRuntime.async(function handleSearch$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          e.preventDefault();
          searchTerm = query.value.trim();

          if (!searchTerm) {
            _context4.next = 9;
            break;
          }

          isSearching = true;
          clearResults();
          newUrl = "".concat(searchUrl).concat(searchTerm, "&page=").concat(page);
          _context4.next = 8;
          return regeneratorRuntime.awrap(fetchAndShowResult(newUrl));

        case 8:
          query.value = "";

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  });
} // Event listeners


form.addEventListener('submit', handleSearch);
window.addEventListener('scroll', detectEnd);
window.addEventListener('resize', detectEnd); // Initialize the page

function init() {
  var url;
  return regeneratorRuntime.async(function init$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          clearResults();
          url = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=".concat(apiKey, "&page=").concat(page);
          isSearching = false;
          _context5.next = 5;
          return regeneratorRuntime.awrap(fetchAndShowResult(url));

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
}

init();
//# sourceMappingURL=index.dev.js.map
