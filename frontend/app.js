Vue.createApp({
  data() {
    return {
      pets: [
        {
          name: "Charlie",
          species: "dog",
          breed: "pug",
          age: "3",
          gender: "animal",
        },
        {
          name: "Bagel",
          species: "hamster",
          breed: "speckled",
          age: "0",
          gender: "animal",
        },
        {
          name: "BumbleBee",
          species: "turtle",
          breed: "great big",
          age: "120",
          gender: "animal",
        },
        {
          name: "Hazelnut",
          species: "llama",
          breed: "furry",
          age: "20",
          gender: "animal",
        },
        {
          name: "Boomer",
          species: "shark",
          breed: "greenland",
          age: "500",
          gender: "animal",
        },
        {
          name: "Jake",
          species: "human",
          breed: "ex-boyfriend",
          age: "perpetually 16",
          gender: "animal",
        },
      ],

      search: "",
      filteredPets: [],
      newPet: {
        name: "",
        species: "",
        breed: "",
        age: "",
        gender: "",
      },
      applicants: [],
      newApplicant: {
        name: "",
        phoneNumber: "",
        email: "",
        petId: "",
      },
    };
  },

  methods: {
    //makes a GET request to the server for all pet listings
    getListings: function () {
      fetch("http://localhost:8080/pets")
        .then((response) => response.json())
        .then((data) => {
          this.pets = data;
          console.log(this.pets);
        });
    },

    //makes a POST request to the server from a "create listing" form
    createListing: function () {
      //question: I dont understand headers
      myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var encodedData =
        "name=" +
        encodeURIComponent(this.modal.name) +
        "&species=" +
        encodeURIComponent(this.modal.species) +
        "&breed=" +
        encodeURIComponent(this.modal.breed);
      //age: "", gender: "",
      console.log(encodedData);

      var requestOptions = {
        method: "POST",
        body: encodedData,
        headers: myHeaders,
      };

      fetch("http://localhost:8080/pets", requestOptions).then((response) => {
        if (response.status === 201) {
          response.json().then((data) => {
            this.pets.push(data);
            this.newPet = {};
          });
        } else {
          alert("Not able to add a pet... ");
        }
      });
    },

    //makes a DELETE request to the server based on the ID number of the pet being deleted
    deleteListing: function (listingId) {
      var delPet = this.pets[listingId]._id;
      var requestOptions = {
        method: "DELETE",
      };
      fetch(`http://localhost:8080/pets/${delPet}`, requestOptions).then(
        (response) => {
          if (response.status === 204) {
            console.log("pet was deleted");
          } else {
            alert("pet was not deleted");
          }
        }
      );
    },

    //makes a GET request for all adoption applications
    getApplications: function () {
      fetch("http://localhost:8080/applications")
        .then((response) => response.json())
        .then((data) => {
          this.applicants = data;
        });
    },

    //makes a POST request to the server from a "new adoption" application form
    createApplication: function () {
      //question: i still don't understand what headers are doing
      myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var encodedData =
        "name=" +
        encodeURIComponent(this.newApplicant.name) +
        "&phoneNumber=" +
        encodeURIComponent(this.newApplicant.phoneNumber) +
        "&email=" +
        encodeURIComponent(this.newApplicant.email) +
        "&petId=" +
        encodeURIComponent(this.newApplicant.petId);

      var requestOptions = {
        method: "POST",
        body: encodedData,
        headers: myHeaders,
      };

      fetch("http://localhost:8080/application", requestOptions).then(
        (response) => {
          if (response.status === 201) {
            response.json().then((data) => {
              this.applicants.push(data);
              this.newApplicant = {};
            });
          } else {
            alert("Did not create new applicant...");
          }
        }
      );
    },

    //goes to a different "page" - a.k.a. changes a page data property that hides and shows specific sections
    changePage: function (page) {},

    resetSearch: function () {
      this.search = "";
    },
  }, //methods close

  created: function () {
    this.getListings();
  }, //created close

  watch: {
    search(newSearch, oldSearch) {
      this.filteredPets = this.pets.filter((pet) => {
        return pet.name.toLowerCase().includes(newSearch.toLowerCase());
      });
    },
  },

  computed: {},
}).mount("#app");
