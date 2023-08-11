<script lang="ts">
  import lightImage from "$lib/images/light.jpg";
  import lightsAPI from "../api/lights";
  export let id: string = "";
  export let name: string = "";
  export let isOn: boolean = false;
  export let onChange: Function = () => {};

  function change() {
    lightsAPI
      .update(id, {
        id: id,
        isOn: !isOn,
        name: name,
      })
      .then(() => onChange());
  }
</script>

<div class="wrapper">
  <h3>
    {name}
  </h3>
  <p>{id}</p>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <img
    src={lightImage}
    class={`${!isOn && "off"}`}
    alt="Light"
    width="64"
    on:click={change}
  />
</div>

<style>
  p,
  h3 {
    padding: 0;
    margin: 0;
    text-align: center;
  }

  .wrapper {
    border: 1px solid black;
    border-radius: 10px;
    padding: 1rem;
  }

  img {
    display: block;
    margin: auto;
    transition: all 0.5s ease-in-out;
    filter: grayscale(0);
  }

  .off {
    filter: grayscale(1);
  }
</style>
