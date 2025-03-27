<!-- src/lib/NavLinks.svelte -->
<script>
    export let position = 'below';
    export let showEmailModal = false;
    export let showPhoneModal = false;
    export let emailAddress;
    export let phoneNumber;
    // Import ContactModal here
  import ContactModal from './ContactModal.svelte';
  </script>
  
  <div class="space-x-4 relative">
    <a href="https://github.com/LuxuryTimepiece" class="text-crypto-green hover:text-crypto-green/50 hover:underline transition duration-300">GitHub</a>
    <div class="inline-block relative">
      <button
        type="button"
        on:click={() => showEmailModal = !showEmailModal}
        class="text-crypto-green hover:text-crypto-green/50 hover:underline transition duration-300 cursor-pointer"
      >
        Email
      </button>
      <ContactModal
        bind:isOpen={showEmailModal}
        {position}
        label="Email"
        value={emailAddress}
      />
    </div>
    <div class="inline-block relative">
      <button
        type="button"
        on:click={() => showPhoneModal = !showPhoneModal}
        class="text-crypto-green hover:text-crypto-green/50 hover:underline transition duration-300 cursor-pointer"
      >
        Voice
      </button>
      <ContactModal
        bind:isOpen={showPhoneModal}
        {position}
        label="Phone"
        value={phoneNumber}
      />
    </div>
  </div>