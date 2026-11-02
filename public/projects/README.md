# Portfolio Hosted Projects Directory

This directory enables the portfolio to host compatible static browser projects directly under subdirectories:

`/projects/<project-name>/`

For example:
- `/projects/racing-genesis/`
- `/projects/event-booking/`
- `/projects/digit-draw/`

Each project retains its own isolated directory structure, static HTML, CSS, JavaScript, and assets without interfering with the main portfolio React app.

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will bundle this directory along with the main portfolio build into the `dist` artifact for GitHub Pages.
