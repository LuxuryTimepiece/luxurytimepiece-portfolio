<script>
  export let project;
  export let closeModal;

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }
</script>

<div
  class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-crypto-dark/80 backdrop-blur-lg p-6 rounded-xl border border-crypto-green/20 z-50 max-w-lg w-full"
  on:keydown={handleKeyDown}
  role="dialog"
  aria-label={project.title}
  tabindex="-1"
>
  <button
    on:click={closeModal}
    class="absolute top-4 right-4 text-crypto-green hover:text-crypto-green/80 transition text-2xl"
    aria-label="Close modal"
  >
    ✕
  </button>
  <h2 class="text-3xl font-bold mb-4">{project.title}</h2>
  <img
    src={project.screenshot}
    alt={project.title}
    class="w-full h-64 object-cover rounded-md mb-4"
  />
  <p class="text-crypto-gray mb-4 text-lg">{project.description}</p>
  <div class="flex flex-wrap gap-2 mb-4">
    {#each project.tech as tech}
      <span
        class="bg-crypto-green/20 text-crypto-green px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap"
      >
        {tech}
      </span>
    {/each}
  </div>
  {#if project.github}
    <div class="mb-4">
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        class="text-crypto-green hover:underline transition duration-300"
        aria-label={`View ${project.title} on GitHub`}
      >
        View on GitHub
      </a>
    </div>
  {/if}
  <div>
    <a
      href={project.demo || '#'}
      target="_blank"
      rel="noopener noreferrer"
      class={project.demo ? 'text-crypto-green hover:underline transition duration-300' : 'text-crypto-gray cursor-not-allowed'}
      aria-label={`View demo of ${project.title}`}
    >
      View Demo {project.demo ? '' : '(Coming Soon)'}
    </a>
  </div>
</div>