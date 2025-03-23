# Potion Form Library

A Vue component for creating magical potions with validation and event handling.

## Installation

```bash
npm install potion-form
```

or

```bash
yarn add potion-form
```

## Usage

### Setup in your Vue application

First, you need to import and register the PotionForm plugin in your main.js file:

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import PotionForm from 'vue-potion-form'

const app = createApp(App)
app.use(PotionForm)
app.mount('#app')
```

### Using the component

Once registered, you can use the PotionForm component in any of your Vue components:

```vue
<template>
  <div>
    <h1>My Potions Brewery</h1>
    <potion-form
      :default-values="defaultValues"
      :ingredient-list="ingredientsList"
      :difficulty-list="difficultyLevels"
      @potionSubmitted="handleSubmit"
      @potionCleared="handleReset"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultValues: {
        name: 'Healing Potion',
        description: 'A basic potion that restores health',
        ingredients: ['Mandrake Root', 'Unicorn Hair'],
        difficulty: 'Beginner',
        effect: 'Restores 50 health points',
        side_effects: 'May cause drowsiness',
      },
      ingredientsList: [
        'Mandrake Root',
        'Unicorn Hair',
        'Dragon Scale',
        'Phoenix Feather',
        'Troll Blood',
        'Mermaid Tears',
      ],
      difficultyLevels: [
        { label: 'Beginner', value: 'Beginner' },
        { label: 'Intermediate', value: 'Intermediate' },
        { label: 'Advanced', value: 'Advanced' },
        { label: 'Master', value: 'Master' },
      ],
    }
  },
  methods: {
    handleSubmit(event, formData) {
      console.log('Potion submitted:', formData)
      // Process the potion data
    },
    handleReset() {
      console.log('Form has been reset')
      // Handle the form reset event
    },
  },
}
</script>
```

## Props

The component accepts the following props:

| Prop              | Type   | Required | Description                                               |
| ----------------- | ------ | -------- | --------------------------------------------------------- |
| `default-values`  | Object | No       | Default values for the form fields                        |
| `ingredient-list` | Array  | No       | List of available ingredients for selection               |
| `difficulty-list` | Array  | No       | List of difficulty levels with label and value properties |

### Default Values Object Structure

```javascript
{
  name: String,            // Required field
  description: String,     // Required field
  ingredients: Array,      // Required field
  difficulty: String,      // Optional field
  effect: String,          // Optional field
  side_effects: String     // Optional field
}
```

## Events

| Event             | Payload           | Description                        |
| ----------------- | ----------------- | ---------------------------------- |
| `potionSubmitted` | (event, formData) | Emitted when the form is submitted |
| `potionCleared`   | None              | Emitted when the form is reset     |

## Validation Rules

The form implements the following validation:

- **Name**: Required, maximum 100 characters
- **Description**: Required, maximum 500 characters
- **Ingredients**: At least one ingredient required
- **Difficulty**: Optional
- **Effect**: Optional, maximum 500 characters
- **Side Effects**: Optional, maximum 500 characters

## Dependencies

This library requires:

- Vue 3
- Quasar UI framework
