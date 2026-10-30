# nahyunli.github.io

My personal website. It is live at **https://nahyunli.github.io**.

## What's in this folder

| File or folder | What it is | Do I edit it? |
|---|---|---|
| `content.js` | All the words, links, and lists on the site | **Yes, this is the main file** |
| `images/` | Profile photo, banner, portfolio and gallery pictures | Yes, replace pictures here |
| `files/` | CV and slide/poster PDFs | Yes, add PDFs here |
| `index.html` | The page itself | No |
| `assets/` | Design and code | No |

## How to edit text (on the GitHub website)

1. Open the repository on github.com and click `content.js`.
2. Click the **pencil icon** (Edit this file) in the top right.
3. Change the text inside the quote marks.
4. Click **Commit changes…**, then **Commit changes** again.
5. Wait 1–2 minutes and refresh your website.

Formatting inside quotes: `**bold**`, `*italic*`, `[link text](https://example.com)`.

## How to replace a picture

The easiest way is to upload your picture with the **same file name** as the one it replaces.

1. Rename your photo on your computer, for example to `profile.jpg` or `banner.jpg`.
2. On GitHub, open the `images` folder.
3. Click **Add file → Upload files** and drag your photo in.
4. Click **Commit changes**. The old picture is replaced.

| Picture | File name | Best size |
|---|---|---|
| Profile photo | `images/profile.jpg` | Square, about 600 × 600 |
| Banner | `images/banner.jpg` | Wide, about 1600 × 400 |
| Portfolio | `images/portfolio-1.jpg` … | 4:3 landscape |
| Gallery | `images/gallery-1.jpg` … | Any shape |

To add a **new** picture instead, upload it with a new name and type that name into `content.js`.

## How to add a talk or poster

1. Export the slides or poster as a **PDF** (File → Export / Save as PDF).
2. Upload it to the `files` folder.
3. In `content.js`, find the TALKS & POSTERS section, copy one block from `{` to `},`, paste it, and change the title, event, date, and `file: "files/your-file.pdf"`.

## How to update your CV

Upload your new CV into `files` with the name `cv.pdf`. It replaces the old one.

## If something breaks

If the page goes blank after an edit, there is usually a missing quote mark `"`, comma `,`, or bracket in `content.js`.

To undo, open `content.js` on GitHub, click **History**, and compare with the version that worked. Or just ask Claude to look at it.
