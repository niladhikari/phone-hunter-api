const loadPhone = async (searchText = '13' ,isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhone(phones,isShowAll);
};

const displayPhone = (phones,isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");

  // clear phone container cards before adding new cards
  phoneContainer.textContent = "";

  // display show all button if there are more than 12 phones
      const showAllContainer = document.getElementById('show-all-container');

      if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }
    // display only first 12 phones if not show All
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }


      // display no phones found
      const noPhone = document.getElementById('no-found-message');
      if(phones.length === 0){
          noPhone.classList.remove('hidden');
      }
      else{
          noPhone.classList.add('hidden');
      }
      
  phones.forEach((phone) => {
    // console.log(phone);
    // 2 create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card  bg-base-100 shadow-xl`;

    // 3: set inner html
    phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
                        <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions">
                            <button onclick="handleShowDetail('${phone.slug}');my_modal_5.showModal()" class="btn btn-primary">Show Details</button>
                        </div>
                    </div>
        `;
    // 4 append child
    phoneContainer.appendChild(phoneCard);
  });
  toggleLoadingSpinner(false)
};

const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true)
  const inputField = document.getElementById("search-field");
  const inputText = inputField.value;
//   console.log(inputText);
  loadPhone(inputText,isShowAll);
};

// loadPhone();

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

// show Detail
const handleShowDetail = async (id) => {
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data

 showPhoneDetails(phone)
}

const showPhoneDetails = (phone) =>{
console.log(phone);
const showDetailContainer = document.getElementById('show-detail-container');
showDetailContainer.innerHTML = `
        <img  class="m-auto" src="${phone.image}" alt="" />
        <h1 class='font-bold'>${phone.name}</h1>
        <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
        <p><span>GPS:</span>${phone.others?.GPS || 'No GPS available'}</p>
        <p><span>GPS:</span>${phone.others?.GPS ? phone.others.GPS : 'No GPS available in this device'}</p>
`
  // show the modal
  show_details_modal.showModal();
}

// handle show all
const handleShowAll = () => {
  handleSearch(true);
}

loadPhone();