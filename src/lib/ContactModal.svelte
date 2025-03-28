<script>
  export let isOpen = false;
  export let position = 'below';
  export let label = '';
  export let value = '';
  let closeButton;

  $: if (isOpen && closeButton) {
    closeButton.focus();
  }

  function closeModal() {
    isOpen = false;
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }
</script>

{#if isOpen}
  <div
    class="{position === 'below' ? 'top-full mt-2 right-0' : 'bottom-full mb-2 left-1/2 -translate-x-1/2'} absolute bg-crypto-dark/80 backdrop-blur-lg p-6 rounded-xl border border-crypto-green/20 z-50 min-w-[12rem]"
    on:keydown={handleKeyDown}
    role="dialog"
    aria-label={label}
    tabindex="-1"
  >
    <button
      bind:this={closeButton}
      on:click={closeModal}
      class="absolute top-2 right-2 text-crypto-green hover:text-crypto-green/80 transition text-xl"
      aria-label="Close modal"
    >
      ✕
    </button>
    <p class="text-white whitespace-nowrap">{label}: {value}</p>
  </div>
{/if}