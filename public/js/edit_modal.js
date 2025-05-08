const EditModal = {
    props: ['visible', 'currentEdit'],
    emits: ['submit-edit', 'close', 'file-change'],
    template: `
      <div v-if="visible" id="edit-modal" class="modal-overlay">
        <div class="modal-content">
          <h2>Edit Guide</h2>
          <form @submit.prevent="$emit('submit-edit')">
            <label>
              Title:
              <input type="text" v-model="currentEdit.guide.title" required>
            </label>
            <label>
              Description:
              <textarea v-model="currentEdit.guide.description" required></textarea>
            </label>
            <label>
              Duration:
              <input type="text" v-model="currentEdit.guide.duration">
            </label>
            <label>
              Rating:
              <input type="text" v-model="currentEdit.guide.rating">
            </label>
            <label>
              Length:
              <input type="text" v-model="currentEdit.guide.length">
            </label>
            <label>
              Video (YouTube Link):
              <input type="url" v-model="currentEdit.guide.video" required>
            </label>
            <label>
              Image:
              <input type="file" name="image" accept="image/*" @change="$emit('file-change', $event)">
            </label>
            <div class="modal-buttons">
              <button type="submit">Save</button>
              <button type="button" @click="$emit('close')">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    `
  };
  
  export default EditModal;