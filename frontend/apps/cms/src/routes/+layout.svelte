<script>
  import "../app.css";
</script>

<main class="flex flex-1">
  <nav class="w-1/5 h-full bg-blue-500 shadow-lg shadow-blue-500/50">
    <ul>

      <li class="p-5 text-white">
        <a href="/">
          <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" width={24} height={24} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25">
            </path>
          </svg>
        </a>
      </li>

      <li class="p-5 text-white">
        <a href="/authors">Autores</a>
      </li>

      <li class="p-5 text-white">
        <a href="/categories">Categorias</a>
      </li>

      <li class="p-5 text-white">
        <a href="/posts">Posts</a>
      </li>

    </ul>
  </nav>

  <div class="h-full w-full">
    <slot />
  </div>
</main>

<!--  svelte-ignore css-unused-selector -->
<style global>
  main {
    display: flex;
    width: 100vw;
    height: 100vh;
  }

  /* RESET CSS BELOW */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: reset;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
</style>
