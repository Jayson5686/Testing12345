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

## Data Selection (Exercise 3):
Data Source: It's coming from the file "tv_2026_02_15.csv", it contains of every sources of the Branding, Star Rating, Energy Consumption, Screen Technology, Manufacturing counter etc. It has about 4724 rows and 32 attributes for the television model that are included inside the file.

Data Processing: The original CSV data will be import to the KNIME. Using the Knime Analytics Platform to filter out Unknown, Duplicate and Mispelled data as part of the cleaning process. 

Privacy: There is "NO" privacy information matter that is involved inside, it only contains information about television products rather than individual consumers information.

Accuracy: The data is quite messy before the cleaning process. But after the filtration of unwanted data, it become reliable to analysis the data.

Limitations: The dataset has many unique figure/dataset that cause some misleading information like the "Labelled energy consumption is using standardised instead of consumer consume hours". "Emergy-rating group" are unrelavent, for example the data show is has 5-star of 1032 TV, and when come to 8-star it's only have about 8 TVs left.

Ethics:
The data and visualisations should be presented in a way that does not mislead the audience. Chart scales, labels and units should be clearly shown, and comparisons should reflect the actual results rather than a predetermined conclusion. Differences between screen technologies or energy ratings should also be interpreted carefully because other factors, particularly screen size, may influence energy consumption. The data story should therefore avoid claiming that one type of television is always more efficient than another unless the data provides sufficient evidence. Any grouping, averaging and limitations of the dataset should also be explained so that consumers can understand how the conclusions were reached.
## Generative AI Reflection

I used Cursor AI for this exercise. I did not use other GenAI tools.

I mainly used it to help plan the folder layout and Structure be like for (HTML pages, `assets/css`, `assets/js`, `assets/img`) and to bounce ideas for the extra energy calculator, such as using a dropdown of appliances plus a results panel on the same page. I also used it to debug and check structure, for example when CSS and JS paths did not match the folders, and to confirm the FAQ accordion and calculator were split from the HTML instead of mixed into one file.

After that, I changed wording, replaced placeholder names and contact details, swapped in the provided `PowerIcon.png`, and adjusted colours and layout so the pages looked like one site. The calculator values, validation messages, and page content were checked and edited by me so they made sense for the assignment.

What I learned is that GenAI is useful for structure and for spotting broken links or missing files, but it is easy to end up with paths or comments that do not match how I actually organised the project. I still needed to read the brief and test the pages myself.

Limitations: the tool sometimes suggested a different folder layout than I wanted, and once the stylesheet did not load because the HTML still pointed at the old path. It also cannot mark the work for me, so I had to make sure every required page, the footer, and the JavaScript behaviour were actually there.

