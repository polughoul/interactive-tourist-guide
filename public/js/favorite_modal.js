// Vue component for the favorite modal to confirm adding a guide to favorites.
const FavoriteModal = {
  props: ['visible', 'currentFavorite'],
  emits: ['confirm-favorite', 'cancel-favorite'],
  template: `
    <div v-if="visible" id="favorite-modal" class="modal-overlay">
      <div class="modal-content">
        <h2>Add to favorites?</h2>
        <p>Do you want to add "<strong>{{ currentFavorite.title }}</strong>" to your favorites?</p>
        <div class="modal-buttons">
          <button @click="$emit('confirm-favorite')">Yes</button>
          <button @click="$emit('cancel-favorite')">No</button>
        </div>
      </div>
    </div>
  `
};

export default FavoriteModal;