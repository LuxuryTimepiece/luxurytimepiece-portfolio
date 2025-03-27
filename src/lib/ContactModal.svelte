<!-- src/lib/ContactModal.svelte -->
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
  
    function handleKeydown(event) {
      if (event.key === 'Escape') {
        closeModal();
      }
    }
  </script>
  
  {#if isOpen}
    <div
      class="{position === 'below' ? 'top-full mt-2 right-0' : 'bottom-full mb-2 left-1/2 -translate-x-1/2'} absolute bg-crypto-dark/80 backdrop-blur-lg p-4 rounded-xl border border-crypto-green/20 z-50 min-w-[12rem] filter-none"
      on:keydown={handleKeydown}
      role="dialog"
      aria-label={`${label} contact information`}
      tabindex="-1"
    >
      <p class="text-white whitespace-nowrap">{label}: {value}</p>
      <button
        bind:this={closeButton}
        on:click={closeModal}
        class="text-crypto-green hover:text-crypto-green/50 mt-2"
      >
        Close
      </button>
    </div>
  {/if}