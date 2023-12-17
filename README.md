# Webflow Dev Boilerplate

### Custom Code Setup

```html
<script>
  function onErrorLoader() {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/gh/vallafederico/ilya-2023@main/build/app.01.js";
    script.defer = "true";
    document.head.appendChild(script);
  }
</script>
<script
  defer
  src="http://localhost:8000/app.js"
  onerror="onErrorLoader()"
></script>
```
