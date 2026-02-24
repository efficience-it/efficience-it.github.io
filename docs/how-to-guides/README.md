# How-to guides

## Add a new quiz topic

1. Create YAML question files in the [docker-practice](https://github.com/efficience-it/docker-practice) repository under a new `data/` subdirectory.

2. Register the topic in `assets/js/topics.js`:

```js
my_new_topic: {
  title: "Quiz DCA - My New Topic",
  yamlFiles: [
    "data/7_My_new_topic/file1.yaml",
    "data/7_My_new_topic/file2.yaml",
  ],
},
```

3. Add a card in `index.html` inside the topic grid:

```html
<a href="quizz_docker.html?topic=my_new_topic" class="card">
  My New Topic
</a>
```

## Clear the question cache

The app caches fetched YAML in `sessionStorage` to avoid re-downloading on restart. To force a fresh fetch:

- Close and reopen the browser tab (sessionStorage is per-tab), or
- Open DevTools > Application > Session Storage and clear the entries prefixed with `yamlCache:`.

## Clear quiz history

Click the **Clear history** button on the home page, or run in the browser console:

```js
localStorage.removeItem("quizHistory");
```

## Deploy

The app is a static site hosted on GitHub Pages. Pushing to `main` triggers automatic deployment. No build step is needed.

## Switch the question source branch

The YAML files are fetched from a specific branch of the docker-practice repository. To change it, edit the `baseUrl` constant in `assets/js/quizz_docker.js`:

```js
const baseUrl =
  "https://raw.githubusercontent.com/efficience-it/docker-practice/refs/heads/v1.5/";
```

Replace `v1.5` with the target branch name.
