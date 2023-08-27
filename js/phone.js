const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phone);
  displayPhone(phones);
};

const displayPhone = (phones) => {
  const phoneContainer = document.getElementById("phone-container");

  // clear phone container cards before adding new cards
  phoneContainer.textContent = "";

  // display show all button if there are more than 12 phones
      const showAllContainer = document.getElementById('show-all-container');

      if (phones.length > 12) {
        showAllContainer.classList.remove('hidden')
      }
      else{
        showAllContainer.classList.add('hidden')
      }

     phones = phones.slice(0, 12);

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
                            <button class="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
        `;
    // 4 append child
    phoneContainer.appendChild(phoneCard);
  });
  toggleLoadingSpinner(false)
};

const handleSearch = () => {
    toggleLoadingSpinner(true)
  const inputField = document.getElementById("search-field");
  const inputText = inputField.value;
//   console.log(inputText);
  loadPhone(inputText);
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
