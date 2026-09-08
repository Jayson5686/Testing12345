# Appliance Energy Consumption Website

Small multi-page site for a web development exercise. It uses HTML, CSS and JavaScript, and is meant to be pushed to GitHub then hosted later on Mercury.

## Pages

- `index.html` – Home (Australian appliance energy intro + FAQ accordion)
- `televisions.html` – Televisions overview
- `storyboard.html` – Data storyboard (audience, purpose, consumer questions)
- `about.html` – About the project

## Folder structure

```
/
  index.html
  televisions.html
  storyboard.html
  about.html
  assets/
    css/styles.css
    js/scripts.js
    img/PowerIcon.png
  README.md
```

## Features

- Shared top navigation with logo (logo goes back to Home)
- Hover styles and active page highlight
- FAQ accordion on the Home page (JavaScript)
- Storyboard page with a one-open-at-a-time accordion for the TV energy data story
- Shared footer with year, name and GenAI acknowledgement
- External CSS used on all pages

## How to view

Open `index.html` in a browser, or use Live Server in VS Code.

## Generative AI Reflection

I used Cursor AI for this exercise. I did not use other GenAI tools.

I mainly used it to help plan the folder layout and Structure be like for (HTML pages, `assets/css`, `assets/js`, `assets/img`) and to bounce ideas for the extra energy calculator, such as using a dropdown of appliances plus a results panel on the same page. I also used it to debug and check structure, for example when CSS and JS paths did not match the folders, and to confirm the FAQ accordion and calculator were split from the HTML instead of mixed into one file.

After that, I changed wording, replaced placeholder names and contact details, swapped in the provided `PowerIcon.png`, and adjusted colours and layout so the pages looked like one site. The calculator values, validation messages, and page content were checked and edited by me so they made sense for the assignment.

What I learned is that GenAI is useful for structure and for spotting broken links or missing files, but it is easy to end up with paths or comments that do not match how I actually organised the project. I still needed to read the brief and test the pages myself.

Limitations: the tool sometimes suggested a different folder layout than I wanted, and once the stylesheet did not load because the HTML still pointed at the old path. It also cannot mark the work for me, so I had to make sure every required page, the footer, and the JavaScript behaviour were actually there.

