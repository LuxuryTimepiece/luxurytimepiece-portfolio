<script>
    import ContactModal from './ContactModal.svelte';
  
    export let position = 'below';
    export let showEmailModal = false;
    export let showPhoneModal = false;
    export let encodedEmailAddress = '';
    export let encodedPhoneNumber = '';
    export let githubUrl = '';
  
    // Decode Base64 strings
    $: emailAddress = encodedEmailAddress ? atob(encodedEmailAddress) : '';
    $: phoneNumber = encodedPhoneNumber ? atob(encodedPhoneNumber) : '';
  </script>
  
  <div class="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
    <div class="inline-block relative">
      <button
        type="button"
        on:click={() => (showEmailModal = !showEmailModal)}
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
        on:click={() => (showPhoneModal = !showPhoneModal)}
        class="text-crypto-green hover:text-crypto-green/50 hover:underline transition duration-300 cursor-pointer"
      >
        Phone
      </button>
      <ContactModal
        bind:isOpen={showPhoneModal}
        {position}
        label="Phone"
        value={phoneNumber}
      />
    </div>
  
    <div class="inline-block">
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="text-crypto-green hover:text-crypto-green/50 hover:underline transition duration-300"
        aria-label="Visit GitHub profile"
      >
        GitHub
      </a>
    </div>
  </div>