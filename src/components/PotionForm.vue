<template>
  <q-form @submit.prevent="onSubmit" @reset="onReset" class="potion-form q-pa-md q-gutter-y-md">
    <div class="form-header q-mb-lg">
      <h4 class="text-h5 text-primary q-my-none">Create New Potion</h4>
      <div class="text-caption text-grey-7">
        Fill in the details to brew your magical concoction
      </div>
    </div>

    <q-card class="q-pa-md bg-grey-1">
      <q-card-section>
        <div class="text-subtitle2 text-primary q-mb-sm">Details</div>
        <div class="q-mb-md">
          <div class="row items-baseline q-mb-xs">
            <div class="text-subtitle1 text-weight-medium">
              Name <span class="text-negative">*</span>
            </div>
            <q-space />
            <div class="text-caption text-grey">Required</div>
          </div>
          <q-input
            v-model="potion_form_data.name"
            placeholder="Enter a mystical name for your potion..."
            :rules="[(val) => validateField('name')]"
            lazy-rules
            outlined
            bg-color="white"
            class="potion-input"
          >
            <template v-slot:prepend>
              <q-icon name="science" color="primary" />
            </template>
          </q-input>
        </div>

        <div class="q-mb-md">
          <div class="row items-baseline q-mb-xs">
            <div class="text-subtitle1 text-weight-medium">
              Description <span class="text-negative">*</span>
            </div>
            <q-space />
            <div class="text-caption text-grey">Required</div>
          </div>
          <q-input
            v-model="potion_form_data.description"
            placeholder="Describe the magical properties of your potion..."
            :rules="[(val) => validateField('description')]"
            lazy-rules
            type="textarea"
            outlined
            bg-color="white"
            autogrow
            rows="3"
            class="potion-input"
          >
            <template v-slot:prepend>
              <q-icon name="description" color="primary" />
            </template>
          </q-input>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md bg-grey-1">
      <q-card-section>
        <div class="text-subtitle2 text-primary q-mb-sm">Ingredients & Difficulty</div>
        <div class="q-mb-md">
          <div class="row items-baseline q-mb-xs">
            <div class="text-subtitle1 text-weight-medium">
              Ingredients <span class="text-negative">*</span>
            </div>
            <q-space />
            <div class="text-caption text-grey">Required</div>
          </div>
          <q-select
            v-model="potion_form_data.ingredients"
            :options="ingredient_options"
            multiple
            use-chips
            :rules="[(val) => validateField('ingredients')]"
            lazy-rules
            outlined
            bg-color="white"
            class="potion-input"
            dropdown-icon="expand_more"
          >
            <template v-slot:prepend>
              <q-icon name="shopping_basket" color="green-7" />
            </template>
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey-6 text-italic">
                  <span> <q-icon name="warning" class="q-mr-sm" /> No ingredients available</span>
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:selected-item="scope">
              <q-chip
                removable
                @remove="scope.removeAtIndex(scope.index)"
                color="green-2"
                text-color="green-9"
                class="q-ma-xs"
              >
                <q-icon name="eco" size="xs" class="q-mr-xs" />
                {{ scope.opt }}
              </q-chip>
            </template>
          </q-select>
        </div>

        <div class="q-mb-md">
          <div class="row items-baseline q-mb-xs">
            <div class="text-subtitle1 text-weight-medium">Difficulty</div>
          </div>
          <q-select
            v-model="potion_form_data.difficulty"
            :options="difficulty_options"
            option-value="value"
            option-label="label"
            emit-value
            map-options
            outlined
            bg-color="white"
            clearable
            :rules="[(val) => validateField('difficulty')]"
            lazy-rules
            class="potion-input"
          >
            <template v-slot:prepend>
              <q-icon name="psychology" color="amber-9" />
            </template>
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey-6 text-italic">
                  <span>
                    <q-icon name="warning" class="q-mr-sm" /> No difficulty levels available</span
                  >
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="q-pa-md bg-grey-1">
      <q-card-section>
        <div class="text-subtitle2 text-primary q-mb-sm">Magical Effects</div>
        <div class="q-mb-md">
          <div class="row items-baseline q-mb-xs">
            <div class="text-subtitle1 text-weight-medium">Effects</div>
          </div>
          <q-input
            v-model="potion_form_data.effect"
            placeholder="Describe what happens when the potion is consumed..."
            :rules="[(val) => validateField('effect')]"
            lazy-rules
            outlined
            bg-color="white"
            autogrow
            class="potion-input"
          >
            <template v-slot:prepend>
              <q-icon name="auto_awesome" color="purple-6" />
            </template>
          </q-input>
        </div>

        <div class="q-mb-md">
          <div class="row items-baseline q-mb-xs">
            <div class="text-subtitle1 text-weight-medium">Side Effects</div>
          </div>
          <q-input
            v-model="potion_form_data.side_effects"
            placeholder="List any unintended consequences..."
            :rules="[(val) => validateField('side_effects')]"
            lazy-rules
            outlined
            bg-color="white"
            autogrow
            class="potion-input"
          >
            <template v-slot:prepend>
              <q-icon name="healing" color="deep-orange" />
            </template>
          </q-input>
        </div>
      </q-card-section>
    </q-card>

    <div class="row justify-end q-mt-lg">
      <q-btn
        label="Reset"
        type="reset"
        color="grey-7"
        flat
        class="q-mr-sm"
        icon="restart_alt"
        no-caps
      />
      <q-btn
        label="Create Potion"
        type="submit"
        color="primary"
        unelevated
        icon="local_pharmacy"
        no-caps
        rounded
        elevated
      />
    </div>
  </q-form>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'PotionForm',
  props: {
    default_values: {
      type: Object,
    },
    ingredient_list: {
      type: Array,
    },
    difficulty_list: {
      type: Array,
    },
  },
  setup() {
    return {
      potion_form_data: ref({
        name: '',
        description: '',
        ingredients: [],
        difficulty: '',
        effect: '',
        side_effects: '',
      }),
      potion_form_data_errors: ref({
        name: { error_message: '', error: false },
        description: { error_message: '', error: false },
        ingredients: { error_message: '', error: false },
        difficulty: { error_message: '', error: false },
        effect: { error_message: '', error: false },
        side_effects: { error_message: '', error: false },
      }),
      ingredient_options: ref([]),
      difficulty_options: ref([]),
    }
  },
  methods: {
    validateField(field) {
      this.potion_form_data_errors[field].error = false
      this.potion_form_data_errors[field].error_message = ''
      if (
        ['name', 'description', 'ingredients'].includes(field) &&
        (!this.potion_form_data[field] || this.potion_form_data[field].length === 0)
      ) {
        this.potion_form_data_errors[field].error = true
        this.potion_form_data_errors[field].error_message = 'This field is required'
      }

      if (field === 'name' && this.potion_form_data_errors.name.error === false) {
        this.potion_form_data_errors.name.error = !(this.potion_form_data.name.length <= 100)
        if (this.potion_form_data_errors.name.error) {
          this.potion_form_data_errors.name.error_message =
            'The potion name must be less than or equal to 100 characters.'
        }
      }

      if (field === 'effect' || field === 'side_effects' || field === 'description') {
        if (this.potion_form_data[field] && this.potion_form_data[field].length > 500) {
          this.potion_form_data_errors[field].error = true
          this.potion_form_data_errors[field].error_message = 'Maximum 500 characters.'
        }
      }
      return this.potion_form_data_errors[field].error
        ? this.potion_form_data_errors[field].error_message
        : true
    },
    onSubmit(evt) {
      this.$emit('potionSubmitted', evt, this.potion_form_data)
    },
    onReset() {
      this.potion_form_data = {
        name: '',
        description: '',
        ingredients: [],
        difficulty: '',
        effect: '',
        side_effects: '',
      }
      this.$emit('potionCleared')
    },
  },
  watch: {
    ingredient_list: {
      handler(newValue) {
        if (newValue) {
          this.ingredient_options = newValue
        }
      },
    },
    difficulty_list: {
      handler(newValue) {
        if (newValue) {
          this.difficulty_options = newValue
        }
      },
    },
    default_values: {
      handler(newValue) {
        if (newValue) {
          Object.assign(this.potion_form_data, newValue)
          this.potion_form_data.ingredients = this.potion_form_data['ingredients'] =
            this.ingredient_options.filter((item) => newValue.ingredients.includes(item))
          this.potion_form_data.difficulty =
            this.difficulty_options.find((item) => item === newValue.difficulty) || null
        }
      },
      deep: true,
    },
  },
  created() {
    if (this.ingredient_list?.length > 0) {
      this.ingredient_options = this.ingredient_list
    }
    if (this.difficulty_list?.length > 0) {
      this.difficulty_options = this.difficulty_list
    }
    if (this.default_values) {
      Object.assign(this.potion_form_data, this.default_values)
      this.potion_form_data.ingredients = this.potion_form_data['ingredients'] =
        this.ingredient_options.filter((item) => this.default_values.ingredients.includes(item))
      this.potion_form_data.difficulty =
        this.difficulty_options.find((item) => item === this.potion_form_data.difficulty) || null
    }
  },
})
</script>
