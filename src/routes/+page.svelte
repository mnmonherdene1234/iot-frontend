<script lang="ts">
  import lightsAPI from "../api/lights";
  import type { LightModel } from "../models/light.model";
  import Light from "./Light.svelte";

  let lights: LightModel[] = [];

  function fetchLights() {
    lightsAPI
      .list()
      .then((value) => (lights = value as LightModel[]))
      .catch((error) => console.log(error));
  }

  fetchLights();
</script>

<svelte:head>
  <title>IoT Test</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>
<h1>Гэрэл</h1>
<div class="lights">
  {#each lights as light}
    <Light
      id={light.id}
      name={light.name}
      isOn={light.isOn}
      onChange={fetchLights}
    />
  {/each}
</div>

<style>
  h1 {
    text-align: center;
  }

  .lights {
    display: grid;
    gap: 1rem;
    grid-template-columns: auto;
  }

  @media (min-width: 768px) {
    .lights {
      grid-template-columns: auto auto;
    }
  }

  @media (min-width: 1024px) {
    .lights {
      grid-template-columns: auto auto auto;
    }
  }
</style>
