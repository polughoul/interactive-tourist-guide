// Vue component for the edit modal to modify guide information.
const EditModal = {
  props: ['visible', 'currentEdit'],
  emits: ['submit-edit', 'close', 'file-change'],
  template: `
    <div v-if="visible" id="edit-modal" class="modal-overlay">
      <div class="modal-content">
        <h2>Edit Guide</h2>
        <form @submit.prevent="validateAndSubmit">
          <label>
            Title:
            <input type="text"
                   v-model="currentEdit.guide.title"
                   placeholder="Enter title (10-30 characters)"
                   required minlength="10" maxlength="30">
          </label>
          <label>
            Description:
            <textarea v-model="currentEdit.guide.description"
                      placeholder="Enter description (20-100 characters)"
                      required minlength="20" maxlength="150"
                      style="white-space: pre-wrap; overflow-wrap: break-word"></textarea>
          </label>
          <label>
            Duration:
            <input type="text"
                   v-model="currentEdit.guide.duration"
                   placeholder="e.g., 3 hours or 45 minutes"
                   pattern="^(?:[1-9]|[1-5][0-9]|60)\\s+(hours|minutes)$"
                   required>
          </label>
          <label>
            Rating:
            <input type="text"
                   v-model="currentEdit.guide.rating"
                   placeholder="e.g., 4.5"
                   pattern="^(?:[1-4]\\.[0-9]|5\\.0)$"
                   required>
          </label>
          <label>
            Length:
            <input type="text"
                   v-model="currentEdit.guide.length"
                   placeholder="e.g., 5 km"
                   pattern="^(?:[1-9]|[1-5][0-9]|60)\\s+km$"
                   required>
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