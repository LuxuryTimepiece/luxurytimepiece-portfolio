<script>
  import { onMount } from 'svelte';
  import { projects } from './lib/projects';
  import NavLinks from './lib/NavLinks.svelte';
  import ProjectModal from './lib/ProjectModal.svelte';

  let currentYear = new Date().getFullYear();
  let selectedProject = null;
  let showEmailModalHeader = false;
  let showPhoneModalHeader = false;
  let showEmailModalFooter = false;
  let showPhoneModalFooter = false;
  let menuOpen = false;
  let searchTerm = ''; // State for the search input
  let filteredProjects = projects; // Filtered projects based on search

  let encodedEmailAddress = 'dG9tYXRvZXNhbmRlZ2dzQHN1ZG9tYWlsLmNvbQ==';
  let encodedPhoneNumber = 'KDYxNSkgMjU3LTc3Njk=';
  let githubUrl = 'https://github.com/LuxuryTimepiece';

  // Filter projects based on search term
  $: {
    if (searchTerm.trim() === '') {
      filteredProjects = projects;
    } else {
      const searchLower = searchTerm.toLowerCase();
      filteredProjects = projects.filter(project =>
        project.tech.some(tech => tech.toLowerCase().includes(searchLower))
      );
    }
  }

  function openModal(project) {
    selectedProject = project;
  }

  function closeModal() {
    selectedProject = null;
  }

  function toggleMenu() {
    menuOpen = !menuOpen;
  }
</script>

<div class="min-h-screen bg-crypto-dark text-white">
  <!-- Header -->
  <header class="p-6 bg-crypto-dark/50 backdrop-blur-lg border-b border-crypto-green/20">
    <div class="max-w-6xl mx-auto flex justify-between items-center">
      <h1 class="text-2xl font-bold">Alexander Harper</h1>
      <div class="hidden md:flex items-center space-x-4">
        <NavLinks
          position="below"
          bind:showEmailModal={showEmailModalHeader}
          bind:showPhoneModal={showPhoneModalHeader}
          {encodedEmailAddress}
          {encodedPhoneNumber}
          {githubUrl}
        />
      </div>
      <button
        class="md:hidden text-crypto-green focus:outline-none"
        on:click={toggleMenu}
        aria-label="Toggle menu"
      >
        {#if menuOpen}
          ✕
        {:else}
          ☰
        {/if}
      </button>
    </div>
    {#if menuOpen}
      <div class="md:hidden mt-4 flex flex-col space-y-2">
        <NavLinks
          position="below"
          bind:showEmailModal={showEmailModalHeader}
          bind:showPhoneModal={showPhoneModalHeader}
          {encodedEmailAddress}
          {encodedPhoneNumber}
          {githubUrl}
        />
      </div>
    {/if}
  </header>

  <!-- Hero Section -->
  <section class="flex flex-col items-center justify-center py-12 text-center">
    <h2 class="text-4xl font-extrabold mb-4">Full Stack Web Developer</h2>
    <p class="text-xl max-w-2xl text-crypto-gray mb-6">
      I build web apps and tools, often exploring Bitcoin and crypto technologies.
      Passionate about agriculture and sustainable tech.<br />This portfolio is built with Svelte.
    </p>
    <button
      type="button"
      on:click={() => document.querySelector('.grid').scrollIntoView({ behavior: 'smooth' })}
      class="bg-crypto-green/20 text-crypto-green px-6 py-2 rounded-full text-lg font-medium hover:bg-crypto-green/30 hover:shadow-lg hover:shadow-crypto-green/20 transition-all duration-300"
    >
      View My Projects
    </button>
  </section>

  <!-- Projects Section -->
  <section class="max-w-6xl mx-auto py-12 px-6">
    <h2 class="text-3xl font-bold mb-6 text-center">Projects</h2>
    <!-- Search Bar -->
    <div class="mb-6 flex justify-center">
      <input
        type="text"
        bind:value={searchTerm}
        placeholder="Search by technology (e.g., Python, Vue.js)"
        class="w-full max-w-md px-4 py-2 bg-crypto-dark/80 border border-crypto-green/20 rounded-lg text-white placeholder-crypto-gray focus:outline-none focus:ring-2 focus:ring-crypto-green/50 transition-all duration-300"
      />
    </div>
    <!-- Projects Grid -->
    {#if filteredProjects.length > 0}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each filteredProjects as project}
          <div
            class="bg-crypto-dark/80 backdrop-blur-lg p-4 rounded-xl border border-crypto-green/20 cursor-pointer hover:shadow-lg hover:shadow-crypto-green/20 transition-all duration-300 h-[450px] flex flex-col"
            on:click={() => openModal(project)}
            on:keydown={(e) => e.key === 'Enter' && openModal(project)}
            role="button"
            tabindex="0"
          >
            <img
              src={project.screenshot}
              alt={project.title}
              class="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 class="text-xl font-semibold mb-2">{project.title}</h3>
            <p class="text-crypto-gray mb-4 flex-grow overflow-hidden text-ellipsis">{project.description}</p>
            <div class="flex flex-wrap gap-2 mb-4">
              {#each project.tech as tech}
                <span
                  class="bg-crypto-green/20 text-crypto-green px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap"
                >
                  {tech}
                </span>
              {/each}
            </div>
            <div class="flex gap-2 mt-auto">
              {#if project.github}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-crypto-green hover:underline transition duration-300"
                  on:click|stopPropagation
                  aria-label={`View ${project.title} on GitHub`}
                >
                  GitHub
                </a>
              {/if}
              <a
                href={project.demo || '#'}
                target="_blank"
                rel="noopener noreferrer"
                class={project.demo ? 'text-crypto-green hover:underline transition duration-300' : 'text-crypto-gray cursor-not-allowed'}
                on:click|stopPropagation
                aria-label={`View demo of ${project.title}`}
              >
                Demo {project.demo ? '' : '(Coming Soon)'}
              </a>
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <p class="text-center text-crypto-gray">No projects found matching "{searchTerm}".</p>
    {/if}
  </section>

  <!-- Modal -->
  {#if selectedProject}
    <div class="fixed inset-0 bg-black/50 backdrop-blur-lg z-40" on:click={closeModal}></div>
    <ProjectModal project={selectedProject} {closeModal} />
  {/if}

  <!-- Footer -->
  <footer class="p-6 bg-crypto-dark/50 backdrop-blur-lg border-t border-crypto-green/20 text-center text-xl">
    <p class="text-crypto-gray">© {currentYear} Alexander Harper. All rights reserved.</p>
    <div class="mt-2 flex justify-center">
      <NavLinks
        position="above"
        bind:showEmailModal={showEmailModalFooter}
        bind:showPhoneModal={showPhoneModalFooter}
        {encodedEmailAddress}
        {encodedPhoneNumber}
        {githubUrl}
      />
    </div>
  </footer>
</div>