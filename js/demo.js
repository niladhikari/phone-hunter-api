const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhone(phones);
};

const displayPhone = (phones) => {
  console.log(phones);
  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent = ''

  // display show all button if there are more than 12 phones
//   const showAllContainer = document.getElementById('show-all-container')
//   if (phones.length > 12) {
//     showAllContainer.classList.remove('hidden')
//   }
//   else{
//     showAllContainer.classList.add('hidden')
//   }
 phones = phones.slice(0, 12);

  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-base-100 shadow-xl`;
    phoneCard.innerHTML = `
    <figure class="px-10 pt-10">
    <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
</figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
    `;
    cardContainer.appendChild(phoneCard)
  });
  toggleLoadingSpinner(false)
};

const handleSearch = () =>{
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('search-field');
    const inputText = searchField.value;
    loadPhone(inputText);
}


const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

// loadPhone();
