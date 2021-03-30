# Typed.js for Vue 3

Vue 3 Component wrapper for [Typed.js](https://github.com/mattboldt/typed.js).

[![npm](https://img.shields.io/npm/dm/vue3-typed-js.svg?style=for-the-badge)](https://www.npmjs.com/package/vue-typed-js)
[![Vue 3](https://img.shields.io/badge/vue-3.x-brightgreen.svg?style=for-the-badge)](https://vuejs.org/)
[![Code Quality (Codacy)](https://img.shields.io/codacy/grade/65e97fef490a4e35853566b8932ecdb8?style=for-the-badge)](https://www.codacy.com/gh/VottusCode/vue3-typed.js/dashboard?utm_source=github.com&utm_medium=referral&utm_content=VottusCode/vue3-typed.js&utm_campaign=Badge_Grade)

Check out Typed.js [here](https://github.com/mattboldt/typed.js/).

# Installation

```
npm install --save vue3-typed.js
# Yarn:
yarn add vue3-typed.js
```

## Use <VueTyped>

You can either add the component globally:

```ts
import { createApp } from 'vue';
import { plugin as vueTyped } from 'vue3-typed.js';

const app = createApp();

app.use(vueTyped);
```

Or use the component directly:

```ts
<script lang="ts">
import { VueTyped } from "vue3-typed.js"

export default defineComponent({
  components: {
    VueTyped
  }
})
</script>
```

# Usage

To get started simply use the `VueTyped` component in your template.

Minimal setup:

```html
<vue-typed :strings="['Hello', 'World']" />
```

All configuration options of Typed.js can be passed via props.

You can pass an element with the `typing` class inside of the component, which will be used by Typed.js.

```html
<vue-typed :strings="['World', 'John']">
  <h1>Hello <span class="typing"></span></h1>
</vue-typed>
```

## Props

You can use all available config options (except for events, see [Events](#events)) of Typed.js as props, for more information see the [Typed.js docs](http://mattboldt.github.io/typed.js/docs/).

## Events

The `VueTyped` component emits all events that Typed.js has and passed a Ref for the Typed.js instance.

All available events are available in the [Typed.js docs](http://mattboldt.github.io/typed.js/docs/).

Example usage:

```html
<template>
  <vue-typed :strings="['hello', 'world']" @onComplete="onTypingComplete" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { VueTyped, TypedRef } from 'vue3-typed.js';

  export default defineComponent({
    setup() {
      // type TypedRef = vue.Ref<Typed>
      const onTypingComplete = (ref: TypedRef) => {
        ref.value; // Typed.js
        console.log('typing complete');
      };

      return {
        onTypingComplete,
      };
    },
  });
</script>
```

<hr>

2021 &copy; Filip Vottus &ndash; Licensed under [MIT](http://opensource.org/licenses/MIT).
