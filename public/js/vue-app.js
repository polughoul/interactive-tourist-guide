import EditModal from '/public/js/edit_modal.js';
import { loadCities, saveCities } from '/public/js/new_app.js';
const App = {
    data() {
      return {
        // Используем модели из OOP модуля для работы с городами
        cities: loadCities(),
        isAdmin: localStorage.getItem("isAdmin") === 'true',
        draggingGuide: null,
        editingModalVisible: false,
        currentEdit: {
          cityIndex: null,
          guideIndex: null,
          guide: {}
        }
      }
    },
    methods: {
      updateLocalStorage() {
        saveCities(this.cities);
      },
      openEditModal(cityIndex, guideIndex, guide) {
        this.currentEdit = {
          cityIndex,
          guideIndex,
          guide: JSON.parse(JSON.stringify(guide))
        };
        this.editingModalVisible = true;
      },
      closeEditModal() {
        this.editingModalVisible = false;
      },
      editGuide(cityIndex, guideIndex, guide) {
        this.openEditModal(cityIndex, guideIndex, guide);
      },
      submitEdit() {
        const { cityIndex, guideIndex, guide } = this.currentEdit;
        this.cities[cityIndex].guides[guideIndex] = guide;
        this.updateLocalStorage();
        this.editingModalVisible = false;
      },
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
      dragStart(cityIndex, guideId, event) {
        this.draggingGuide = { cityIndex, guideId };
        event.dataTransfer.effectAllowed = 'move';
      },
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
              @edit="editGuide"
              @drag-start="dragStart(cityIndex, $event, $event)"
              @card-drop="cardDrop(cityIndex, $event)"
            ></guide-card>
          </div>
        </div>
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
      props: ['guide', 'cityIndex', 'guideIndex', 'isAdmin'],
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
                    class="btn edit-btn" 
                    @click="$emit('edit', cityIndex, guideIndex, guide)">Edit</button>
          </div>
        </article>
      `,
      methods: {
        handleDragStart(event) {
          this.$emit('drag-start', this.guide.id);
        },
        handleDragEnd() {},
        handleDrop(event) {
          this.$emit('card-drop', this.guide.id);
        }
      }
    },
    'edit-modal': EditModal
  };
  
  Vue.createApp(App).mount("#app");