import EditModal from './components/edit_modal.js';
import FavoriteModal from './components/favorite_modal.js';
import { loadCities, saveCities } from './new_app.js';

/*
  Main Vue application instance.
  Data properties include:
    - cities: loaded from localStorage using our OOP models.
    - isAdmin: whether the user is an admin.
    - Flags for modal visibility and current data for editing/favoriting.
*/
const App = {
    data() {
      return {
        cities: loadCities(),
        isAdmin: localStorage.getItem("isAdmin") === 'true',
        draggingGuide: null,
        editingModalVisible: false,
        currentEdit: {
          cityIndex: null,
          guideIndex: null,
          guide: {}
        },
        favorites: JSON.parse(localStorage.getItem("favorites")) || [],
        favoriteModalVisible: false,
        currentFavorite: {}
      }
    },
    methods: {
      // Save updated cities and favorites to localStorage
      updateLocalStorage() {
        saveCities(this.cities);
        localStorage.setItem("favorites", JSON.stringify(this.favorites));
      },
      // Open the edit modal with a deep copy of the guide details
      openEditModal(cityIndex, guideIndex, guide) {
        this.currentEdit = {
          cityIndex,
          guideIndex,
          guide: JSON.parse(JSON.stringify(guide))
        };
        this.editingModalVisible = true;
      },
      // Close the edit modal
      closeEditModal() {
        this.editingModalVisible = false;
      },
      // Called when the admin clicks the edit button on a guide card
      editGuide(cityIndex, guideIndex, guide) {
        this.openEditModal(cityIndex, guideIndex, guide);
      },
      // Save modifications after editing and update localStorage
      submitEdit() {
        const { cityIndex, guideIndex, guide } = this.currentEdit;
        this.cities[cityIndex].guides[guideIndex] = guide;
        this.updateLocalStorage();
        this.editingModalVisible = false;
      },
      // Handle file change event to update the guide image
      handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.currentEdit.guide.image = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      },
      // Start dragging a guide card; store its id and city index
      dragStart(cityIndex, guideId, event) {
        this.draggingGuide = { cityIndex, guideId };
        event.dataTransfer.effectAllowed = 'move';
      },
       // Handle drop event to reposition the dragged guide card
      cardDrop(cityIndex, dropGuideId) {
        if (!this.draggingGuide) return;
        if (this.draggingGuide.cityIndex === cityIndex) {
          const city = this.cities[cityIndex];
          const draggedIndex = city.guides.findIndex(g => String(g.id) === String(this.draggingGuide.guideId));
          const dropIndex = city.guides.findIndex(g => String(g.id) === String(dropGuideId));
          if (draggedIndex === -1 || dropIndex === -1) return;
          const moved = city.guides.splice(draggedIndex, 1)[0];
          if (draggedIndex < dropIndex) {
            city.guides.splice(dropIndex, 0, moved);
          } else {
            city.guides.splice(dropIndex, 0, moved);
          }
          this.updateLocalStorage();
        }
        this.draggingGuide = null;
      },
      // Opens the favorite modal and sets the current favorite guide data
      openFavoriteModal(cityIndex, guideIndex, guide) {
        this.currentFavorite = { ...guide};
        this.favoriteModalVisible = true;
      },
      // Confirm adding the current guide to favorites and update localStorage
      confirmFavorite() {
        const fav = {id: this.currentFavorite.id, title: this.currentFavorite.title};
        if (!this.favorites.find(f => f.id === fav.id)) {
          this.favorites.push(fav);
          this.updateLocalStorage();
        }
        this.favoriteModalVisible = false;
      },
      cancelFavorite() {
        this.favoriteModalVisible = false;
      },
      // Remove a guide from favorites and update localStorage
      removeFavorite(favId) {
        this.favorites = this.favorites.filter(fav => String(fav.id) !== String(favId));
        this.updateLocalStorage();
      }

    },
    template: `
      <div>
        <div v-for="(city, cityIndex) in cities" :key="cityIndex" class="city-group">
          <h3 class="city-title">{{ city.name }}</h3>
          <div class="city-guides" :data-city-index="cityIndex">
            <guide-card 
              v-for="(guide, guideIndex) in city.guides" 
              :key="guide.id" 
              :guide="guide" 
              :city-index="cityIndex" 
              :guide-index="guideIndex"
              :is-admin="isAdmin"
              :favorites="favorites"
              @edit="editGuide"
              @drag-start="dragStart(cityIndex, $event, $event)"
              @card-drop="cardDrop(cityIndex, $event)"
              @add-favorite="openFavoriteModal"
            ></guide-card>
          </div>
        </div>
        <favorite-list :favorites="favorites" @remove-favorite="removeFavorite"></favorite-list>
        <favorite-modal
          :visible="favoriteModalVisible" 
          :currentFavorite="currentFavorite" 
          @confirm-favorite="confirmFavorite" 
          @cancel-favorite="cancelFavorite">
        </favorite-modal>
        <edit-modal 
          :visible="editingModalVisible" 
          :currentEdit="currentEdit" 
          @submit-edit="submitEdit" 
          @close="closeEditModal"
          @file-change="handleFileChange">
        </edit-modal>
      </div>
    `
  };
  
  App.components = {
    'guide-card': {
      props: ['guide', 'cityIndex', 'guideIndex', 'isAdmin', 'favorites'],
      computed: {
        // Returns true if the guide is already favorited
        isFavorited() {
          return this.favorites.some(fav => String(fav.id) === String(this.guide.id));
        }
      },
      template: `
        <article class="guide-card" 
               draggable="true" 
               @dragstart="handleDragStart($event)" 
               @dragend="handleDragEnd" 
               @dragover.prevent 
               @drop="handleDrop($event)">
          <div class="guide-image-wrapper">
            <img :src="guide.image" :alt="guide.title" class="guide-image">
          </div>
          <div class="guide-content">
            <h3>{{ guide.title }}</h3>
            <p class="guide-description">{{ guide.description }}</p>
            <div class="guide-meta">
              <span class="guide-rating">★ {{ guide.rating }}</span>
              <span class="guide-duration">{{ guide.duration }}</span>
              <span class="guide-length">{{ guide.length }}</span>
            </div>
            <a :href="'route_detail.html?id=' + guide.id" class="btn detail-btn">Detail</a>
            <button v-if="isAdmin" 
                    class="edit-btn" 
                    @click="$emit('edit', cityIndex, guideIndex, guide)">
                <svg class="edit-icon" viewBox="0 0 24 24">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.001 1.001 0 0 0 0-1.41l-2.34-2.34a1.001 1.001 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
            </button>
            <button class = "btn favorite-btn" @click="$emit('add-favorite', cityIndex, guideIndex, guide)">
              <svg width="16" height="16" viewBox="0 0 24 24" :fill="isFavorited ? '#FFD700' : 'none'" :stroke="isFavorited ? 'none' : '#000'" stroke-width="2">
                <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847L19.335 24 12 20.202 4.665 24 6 15.27 0 9.423l8.332-1.268z"/>
              </svg>
            </button>
          </div>
        </article>
      `,
      methods: {
        // Emit drag start event to parent component with guide id
        handleDragStart(event) {
          this.$emit('drag-start', this.guide.id);
        },
        handleDragEnd() {},
        // Emit drop event to parent component with guide id
        handleDrop(event) {
          this.$emit('card-drop', this.guide.id);
        }
      }
    },
    'edit-modal': EditModal,
    'favorite-modal': FavoriteModal,
    'favorite-list': {
      props: ['favorites'],
      template: `
        <section id="favorites" class = "section">
          <h2 class = "section-title">Favorite Guides</h2>
          <ul class = "favorite-list">
            <li v-for="fav in favorites" :key="fav.id">
              <a :href="'route_detail.html?id=' + fav.id">{{ fav.title }}</a>
              <button class="remove-fav-btn" @click="$emit('remove-favorite', fav.id)">✖</button>
            </li>
          </ul>
        </section>  
      `
    }
  };
  
  Vue.createApp(App).mount("#app");