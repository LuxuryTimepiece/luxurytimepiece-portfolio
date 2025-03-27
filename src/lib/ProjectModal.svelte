<!-- src/lib/ProjectModal.svelte -->
<script>
  export let project;
  export let closeModal;
  import { onMount, afterUpdate } from 'svelte';

  let closeButton;

  onMount(() => {
    closeButton.focus();
  });

  afterUpdate(() => {
    if (closeButton) closeButton.focus();
  });

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }

  function handleInnerKeydown(event) {
    event.stopPropagation();
  }
</script>

<div
  class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
  on:click={closeModal}
  on:keydown={handleKeydown}
  role="dialog"
  aria-labelledby="modal-title"
  tabindex="-1"
>
  <div
    class="bg-crypto-dark/80 backdrop-blur-lg p-6 rounded-xl border border-crypto-green/20 max-w-lg w-full max-h-[90vh] overflow-y-auto"
    on:click|stopPropagation
    on:keydown|stopPropagation={handleInnerKeydown}
    role="presentation"
  >
    <h2 id="modal-title" class="text-2xl font-bold mb-4 text-white">{project.title}</h2>
    <img src={project.screenshot} alt={project.title} class="w-full h-48 object-cover rounded-md mb-4" />
    <p class="text-crypto-gray mb-4">{project.description}</p>
    <div class="flex flex-wrap gap-2 mb-4">
      {#each project.tech as tech}
        <span class="bg-crypto-green/20 text-crypto-green px-3 py-1 rounded-full text-sm font-medium">
          {tech}
        </span>
      {/each}
    </div>
    <button
      bind:this={closeButton}
      on:click={closeModal}
      class="text-crypto-green hover:text-crypto-green/50 transition duration-300"
    >
      Close
    </button>
  </div>
</div>