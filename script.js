// array of 10 countries
let input = document.getElementById("searchInput");
let searchContents = document.getElementById('searchContents');
// let countries = ["America", "Canada", "France", "Germany", "Italy", "Japan", "Russia", "Spain", "UK", "USA"];
// array of all countries
let countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czechia", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Thailand", "Trinidad & Tobago", "Turkey", "Turkmenistan", "Turks & Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands", "Wales", "Yemen", "Zambia", "Zimbabwe"];
countries.sort();

// inserting the countries into the search menu
let inputContents = "";
countries.forEach((element) => {
    inputContents += `<button>${element}</button>`;
})
searchContents.innerHTML = `${inputContents}`;
// adding eventlistener in the suggestions
let addEventOnSuggestions = () => {
    let suggestions = searchContents.children;
    for (item of suggestions) {
        // autocomplete onclicking the suggestion text in input and hide the search menu
        item.addEventListener('mouseover', (e) => {
            autoCompleteAndHide(e.target);
        })
        item.addEventListener('click', (e) => {
                autoCompleteAndHide(e.target);
            })
            // autocomplete on pressing enter in the input and hide the search menu
        item.addEventListener('keydown', (e) => {
                if (e.key == 'Enter') {
                    autoCompleteAndHide(e.target);
                }
            })
            // gives focus to next suggestion on pressing down arrow and gives focus to previous suggestion on pressing up arrow
        item.addEventListener('keydown', (e) => {
            if (e.key == 'ArrowDown') {
                let next = e.target.nextElementSibling;
                if (next) {
                    e.target.blur();
                    next.focus();
                }
            }
            if (e.key == 'ArrowUp') {
                let previous = e.target.previousElementSibling;
                if (!previous) {
                    e.target.blur();
                    input.focus();
                }
                if (previous) {
                    e.target.blur();
                    previous.focus();
                }
            }
        })
    }
}
addEventOnSuggestions();

// focusing on the first child of the search menu on pressing down arrow
let searchItems = searchContents.children;
input.addEventListener('keydown', (e) => {
    if (e.key = 'ArrowDown' && e.keyCode == 40) {
        searchItems[0].focus();
    }
})

// hiding search menu on clicking outside of it
document.addEventListener('click', (e) => {
    if (e.target.id !== 'searchInput' && e.target.id !== 'searchContents') {
        searchContents.classList.add('hide');
    }
})


// autocomplete onclicking the suggestion text in input and hide the search menu
let autoCompleteAndHide = (btn) => {
    input.value = btn.innerText;
    searchContents.classList.remove('hide');
}

// showing the search menu on clicking the input
input.onfocus = () => {
    searchContents.classList.remove('hide');
}

// filtering the search menu on typing in the input and bold the match words
input.addEventListener('input', () => {
    let inputVal = input.value.toLowerCase();
    let matchInput = "";
    countries.forEach(element => {
        if (element.toLowerCase().startsWith(inputVal)) {
            let matchBold = `<b>${element.slice(0, inputVal.length)}</b>`;
            matchBold += element.slice(inputVal.length);
            matchInput += `<button>${matchBold}</button>`;
        }
    });
    searchContents.innerHTML = `${matchInput}`;
    addEventOnSuggestions();
})