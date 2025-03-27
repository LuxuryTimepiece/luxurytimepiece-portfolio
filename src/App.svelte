<!-- src/App.svelte -->
<script>
  import { projects } from './lib/projects';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import ProjectModal from './lib/ProjectModal.svelte';
  import ContactModal from './lib/ContactModal.svelte';
  import NavLinks from './lib/NavLinks.svelte';

  let selectedProject = null;
  let filter = '';
  let showPhoneModalHeader = false;
  let showPhoneModalFooter = false;
  let showEmailModalHeader = false;
  let showEmailModalFooter = false;

  const encodedPhone = "KDYxNSkgMjU3LTc3Njk=";
  const phoneNumber = atob(encodedPhone);

  const encodedEmail = "dG9tYXRvZXNhbmRlZ2dzQHN1ZG9tYWlsLmNvbQ==";
  const emailAddress = atob(encodedEmail);

  let currentYear = new Date().getFullYear();

  console.log('App: App.svelte script block executed');

  onMount(() => {
    console.log('App: onMount hook called');
    console.log('App: Projects loaded:', projects);
  });

  function openModal(project) {
    console.log('App: Opening modal for project:', project.title);
    selectedProject = project;
  }

  function closeModal() {
    console.log('App: Closing modal');
    selectedProject = null;
  }

  $: filteredProjects = filter
    ? projects.filter(project =>
        project.title.toLowerCase().includes(filter.toLowerCase()) ||
        project.description.toLowerCase().includes(filter.toLowerCase()) ||
        project.tech.some(tech => tech.toLowerCase().includes(filter.toLowerCase()))
      )
    : projects;
</script>

<div class="bg-crypto-dark text-white">
  <!-- Header -->
  <header class="flex justify-between items-center p-6 bg-crypto-dark/50 backdrop-blur-lg border-b border-crypto-green/20">
    <h1 class="text-3xl font-bold">Alexander Harper</h1>
    <nav class="text-xl">
      <NavLinks
        position="below"
        bind:showEmailModal={showEmailModalHeader}
        bind:showPhoneModal={showPhoneModalHeader}
        {emailAddress}
        {phoneNumber}
      />
    </nav>
  </header>

  <!-- Hero Section -->
  <section class="flex flex-col items-center justify-center py-12 text-center">
    <h2 class="text-4xl font-extrabold mb-4">Full Stack Web Developer</h2>
    <p class="text-xl max-w-2xl text-crypto-gray mb-6">
      I build web apps and tools, often exploring Bitcoin and crypto technologies. Passionate about agriculture and sustainable tech.<br>This portfolio is built with Svelte.
    </p>
    <button
      type="button"
      on:click={() => document.querySelector('.grid')?.scrollIntoView({ behavior: 'smooth' })}
      class="bg-crypto-green/20 text-crypto-green px-6 py-2 rounded-full text-lg font-medium hover:bg-crypto-green/30 hover:shadow-lg hover:shadow-crypto-green/20 transition-all duration-300"
    >
      View My Projects
    </button>
  </section>

  <!-- Projects Section -->
  <section class="p-2 min-h-screen">
    <h3 class="text-3xl font-bold mb-6 text-center">Projects</h3>
    <div class="max-w-6xl mx-auto mb-8">
      <input
        type="text"
        bind:value={filter}
        placeholder="Filter projects by title, description, or tech..."
        class="w-full p-3 rounded-lg bg-crypto-dark/50 border border-crypto-green/20 text-white placeholder-crypto-gray focus:outline-none focus:border-crypto-green/50 transition"
      />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {#each filteredProjects as project (project.title)}
        <button
          on:click={() => openModal(project)}
          aria-label={`View details for ${project.title}`}
          class="bg-crypto-dark/70 backdrop-blur-lg p-8 rounded-xl border border-crypto-green/20 hover:border-crypto-green/50 hover:shadow-lg hover:shadow-crypto-green/20 transition-all transform hover:-translate-y-2 duration-300 flex flex-col h-[38rem]"
          transition:fade="{{ duration: 300 }}"
        >
          <!-- Screenshot -->
          <div class="w-full h-[16rem] flex-shrink-0">
            <img src={project.screenshot} alt={project.title} class="w-full h-full object-cover rounded-md" />
          </div>

          <!-- Title -->
          <h4 class="text-2xl font-bold mt-6 mb-3 flex-shrink-0 w-full text-center">{project.title}</h4>

          <!-- Description -->
          <p class="text-crypto-gray mb-4 text-xl line-clamp-3 flex-grow min-h-[6rem]">{project.description}</p>

          <!-- Tech Badges -->
          <div class="flex flex-wrap gap-2 mt-auto w-full justify-center">
            {#each project.tech as tech}
              <span class="bg-crypto-green/20 text-crypto-green px-3 py-1 rounded-full text-sm font-medium">
                {tech}
              </span>
            {/each}
          </div>
        </button>
      {/each}
    </div>
  </section>

  <!-- Modal -->
  {#if selectedProject}
    <ProjectModal project={selectedProject} {closeModal} />
  {/if}

  <!-- Footer -->
  <footer class="p-6 bg-crypto-dark/50 backdrop-blur-lg border-t border-crypto-green/20 text-center text-xl">
    <p class="text-crypto-gray">© {currentYear} LuxuryTimepiece. All rights reserved.</p>
    <div class="mt-2">
      <NavLinks
        position="above"
        bind:showEmailModal={showEmailModalFooter}
        bind:showPhoneModal={showPhoneModalFooter}
        {emailAddress}
        {phoneNumber}
      />
    </div>
  </footer>
</div>