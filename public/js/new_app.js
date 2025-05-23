// Class representing a Guide with its details.
class Guide {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.duration = data.duration;
    this.rating = data.rating;
    this.length = data.length;
    this.video = data.video;
    this.image = data.image;
    this.audio = data.audio;
    this.coords = data.coords;
    this.gallery = data.gallery || [];
  }
  // Converts the Guide instance to a plain object for storage.
  serialize() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      duration: this.duration,
      rating: this.rating,
      length: this.length,
      video: this.video,
      image: this.image,
      audio: this.audio,
      coords: this.coords,
      gallery: this.gallery
    };
  }
}

// Class representing a City containing multiple guides.
class City {
  constructor(data) {
    this.name = data.name;
    this.guides = data.guides.map(g => new Guide(g));
  }
  serialize() {
    return {
      name: this.name,
      guides: this.guides.map(g => g.serialize())
    };
  }
}

// Loads cities data from localStorage and returns an array of City instances.
function loadCities() {
  const data = JSON.parse(localStorage.getItem("citiesData")) || [];
  return data.map(cityData => new City(cityData));
}

// Saves the array of City instances back into localStorage.
function saveCities(cities) {
  const data = cities.map(city => ({
    name: city.name,
    guides: city.guides.map(g =>
      (g && typeof g.serialize === 'function') ? g.serialize() : g
    )
  }));
  localStorage.setItem("citiesData", JSON.stringify(data));
}

// Initialize default data in localStorage if none exists.
export function initializeDefaultData() {
  if (!localStorage.getItem("citiesData")) {
    const defaultCities = [
      {
        name: "Madrid",
        guides: [
          {
            id: 1,
            title: "Madrid Route 1",
            description: "Discover the vibrant center of Madrid with this walking tour.",
            duration: "2 hours",
            rating: "4.5",
            length: "5 km",
            video: "https://www.youtube.com/watch?v=kR4WwWsOda0",
            image: "public/images/madrid1.jpg",
            audio: "public/audio/madrid1.mp3",
            coords: [40.4168, -3.7038],
            gallery: [
              "public/images/madrid_slider1.jpg",
              "public/images/madrid_slider2.jpg",
              "public/images/madrid_slider3.jpg"
            ]
          },
          {
            id: 2,
            title: "Madrid Route 2",
            description: "A tour around historic monuments and plazas.",
            duration: "3 hours",
            rating: "4.7",
            length: "6 km",
            video: "https://www.youtube.com/watch?v=v82EfVrjGDY",
            image: "public/images/madrid2.jpg",
            audio: "public/audio/madrid2.mp3",
            coords: [40.4188, -3.7058],
            gallery: [
              "public/images/madrid_slider4.jpg",
              "public/images/madrid_slider5.jpg",
              "public/images/madrid_slider6.jpg"
            ]
          },
          {
            id: 3,
            title: "Madrid Route 3",
            description: "Explore museums and art galleries in Madrid.",
            duration: "1 hour",
            rating: "4.3",
            length: "4 km",
            video: "https://www.youtube.com/watch?v=HRqGcL5ram4",
            image: "public/images/madrid3.jpg",
            audio: "public/audio/madrid3.mp3",
            coords: [40.4178, -3.7028],
            gallery: [
              "public/images/madrid_slider7.jpg",
              "public/images/madrid_slider8.jpg",
              "public/images/madrid_slider9.jpg"
            ]
          }
        ]
      },
      {
        name: "Prague",
        guides: [
          {
            id: 4,
            title: "Prague Route 1",
            description: "Walk through the charming Old Town of Prague.",
            duration: "2 hours",
            rating: "4.6",
            length: "5 km",
            video: "https://www.youtube.com/watch?v=cw1vKWztW24",
            image: "public/images/prague1.jpg",
            audio: "public/audio/prague1.mp3",
            coords: [50.0755, 14.4378],
            gallery: [
              "public/images/prague_slider1.jpg",
              "public/images/prague_slider2.jpg",
              "public/images/prague_slider3.jpg"
            ]
          },
          {
            id: 5,
            title: "Prague Route 2",
            description: "Tour the castle district and river views.",
            duration: "3 hours",
            rating: "4.8",
            length: "7 km",
            video: "https://www.youtube.com/watch?v=gf7m-GwoDV4",
            image: "public/images/prague2.jpg",
            audio: "public/audio/prague2.mp3",
            coords: [50.0880, 14.4208],
            gallery: [
              "public/images/prague_slider4.jpg",
              "public/images/prague_slider5.jpg",
              "public/images/prague_slider6.jpg"
            ]
          },
          {
            id: 6,
            title: "Prague Route 3",
            description: "Discover Prague's art and cultural hotspots.",
            duration: "45 minutes",
            rating: "4.4",
            length: "5 km",
            video: "https://www.youtube.com/watch?v=cPR--gryayw",
            image: "public/images/prague3.jpg",
            audio: "public/audio/prague3.mp3",
            coords: [50.083, 14.431],
            gallery: [
              "public/images/prague_slider7.jpg",
              "public/images/prague_slider8.jpg",
              "public/images/prague_slider9.jpg"
            ]
          }
        ]
      },
      {
        name: "Rome",
        guides: [
          {
            id: 7,
            title: "Rome Route 1",
            description: "Visit ancient Rome monuments on this insightful tour.",
            duration: "2 hours",
            rating: "4.7",
            length: "6 km",
            video: "https://www.youtube.com/watch?v=WP44TN_-jw8",
            image: "public/images/rome1.jpg",
            audio: "public/audio/rome1.mp3",
            coords: [41.9028, 12.4964],
            gallery: [
              "public/images/rome_slider1.jpg",
              "public/images/rome_slider2.jpg",
              "public/images/rome_slider3.jpg"
            ]
          },
          {
            id: 8,
            title: "Rome Route 2",
            description: "Explore the Vatican and its surroundings.",
            duration: "3 hours",
            rating: "4.9",
            length: "4 km",
            video: "https://www.youtube.com/watch?v=dx5reuzkr48",
            image: "public/images/rome2.jpg",
            audio: "public/audio/rome2.mp3",
            coords: [41.906, 12.453],
            gallery: [
              "public/images/rome_slider4.jpg",
              "public/images/rome_slider5.jpg",
              "public/images/rome_slider6.jpg"
            ]
          },
          {
            id: 9,
            title: "Rome Route 3",
            description: "Stroll through Rome’s historic center and vibrant piazzas.",
            duration: "60 minutes",
            rating: "4.5",
            length: "3 km",
            video: "https://www.youtube.com/watch?v=CW63UeUbanA",
            image: "public/images/rome3.jpg",
            audio: "public/audio/rome3.mp3",
            coords: [41.900, 12.483],
            gallery: [
              "public/images/rome_slider7.jpg",
              "public/images/rome_slider8.jpg",
              "public/images/rome_slider9.jpg"
            ]
          }
        ]
      }
    ];
    localStorage.setItem("citiesData", JSON.stringify(defaultCities));
  }
}

initializeDefaultData();

const TravelGuideApp = {
  Guide,
  City,
  loadCities,
  saveCities
};

export { loadCities, saveCities };
export default TravelGuideApp;