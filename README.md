# Creating Hugo Module Devloping and Testing Template (1.)

- This folder and Readme.md is intended to create a base setup for creating hugo modules.
- It is pushed onto github under organisation named `agsayyed`.
- When new module needs to be created, it is created under the organisation `agsayyed`. And the module is named as `ags-mcq-module`.
- Keep updating and correcting the readme file as you go along the process of creating the module.
- To start with clone this repository and start creating the module.
- The folder name is changed from `ags-base` to `ags-base-template` and again changed to `ags-module-template` to make it more generic.



## Setting Up the Development Environment

- Prerequisites:
  - Go: Ensure Go is installed and configured on your system.
  - Hugo: Have the extended version of Hugo installed (you can use the one you placed in your Nx workspace).
  - Git: Git should be installed and configured for version control.
  - GitHub Account: You'll need a GitHub account to host your module.

- Directory Structure for `ags-module-template`

Here's the recommended directory structure for your `ags-module-template` module:

```bash
ags-module-template/
├── .github/                 # For GitHub Actions (optional)
│   └── workflows/
│       └── release.yml
├── assets/                  # Assets like CSS, JS, images
│   ├── ags/
│   │   ├── js/
│   │   │   └── index.ts
│   │   └── scss/
│   │       ├── index.scss
│   │       └── variables.tmpl.scss
├── data/                    # Data files used by your module
├── i18n/                    # Translation files
├── layouts/                 # Shortcodes, partials, etc.
│   ├── partials/
│   │   └── ags/
│   │       └── base/
│   │           └── head.html
│   └── shortcodes/
│       └── ags/
│           └── base/
│               └── alert.html
├── go.mod                   # Go module definition
├── go.sum                   # Go module checksums
├── config.toml              # Module configuration (optional)
├── README.md                # Module documentation
├── LICENSE                  # License file (e.g., MIT)
├── package.json             # For managing Node.js dependencies if needed
└── .gitignore               # Files to be ignored by Git
```

- To create this structure these commands are run:

```bash
mkdir -p ags-module-template/.github/workflows
mkdir -p ags-module-template/assets
mkdir -p ags-module-template/assets/ags/js
mkdir -p ags-module-template/assets/ags/scss
mkdir -p ags-module-template/assets/images
mkdir -p ags-module-template/data
mkdir -p ags-module-template/i18n
mkdir -p ags-module-template/layouts/partials/ags/base
mkdir -p ags-module-template/layouts/shortcodes/ags/base

touch ags-module-template/.github/workflows/release.yml
touch ags-module-template/layouts/partials/ags/base/head.html
touch ags-module-template/layouts/shortcodes/ags/base/alert.html
touch ags-module-template/assets/ags/js/index.ts
touch ags-module-template/assets/ags/scss/index.scss
touch ags-module-template/assets/ags/scss/variables.tmpl.scss
touch ags-module-template/go.mod
touch ags-module-template/go.sum
touch ags-module-template/config.toml
touch ags-module-template/README.md
touch ags-module-template/LICENSE
touch ags-module-template/package.json
touch ags-module-template/.gitignore
```

### How to organise the modules

- If you are building different modules belonging to different parts of the website, they can be organised in the following way:

1. For blog related modules, the name would be `github.com/agsayyed/blog/modules/navigation-bar`. This would be a module that would be used to create a navigation bar for the blog. All moduels built for the blog would follow this pattern. The structure is necessary for the so that everything is in place since the start.
2. The top module would be `github.com/agsayyed/blog` which would be the main module for the blog. This module would import all the other modules that are required for the blog, if necessary. The rest would import this blog. A following shows how they would appear in go.mod files, the example is taken from `hbstack` modules.

```go
github.com/hbstack/blog v0.39.0 // indirect
github.com/hbstack/blog/modules/breadcrumb v0.1.23 // indirect
github.com/hbstack/blog/modules/content-panel v0.1.21 // indirect
github.com/hbstack/blog/modules/featured-image v0.2.21 // indirect
github.com/hbstack/blog/modules/giscus v0.1.24 // indirect
github.com/hbstack/blog/modules/heading-sign v0.1.23 // indirect
github.com/hbstack/blog/modules/post-nav v0.4.0 // indirect
github.com/hbstack/blog/modules/related-posts v0.4.0 // indirect
github.com/hbstack/blog/modules/sidebar/posts v0.8.0 // indirect
github.com/hbstack/blog/modules/sidebar/profile v1.3.0 // indirect
github.com/hbstack/blog/modules/sidebar/taxonomies v0.5.0 // indirect
github.com/hbstack/blog/modules/toc-scrollspy v0.2.0 // indirect
```

### Initializing the `ags-module-template` Module

- Initialize the Go module:

```bash
go mod init github.com/agsayyed/ags-module-template
```

This creates a `go.mod` file, which will look like this:

```bash
module github.com/agsayyed/ags-module-template
go 1.20
```

### Implementing Basic Module Functionality

- It is done in the `layouts` directory. Two types of files are created in the `layouts` directory: `shortcodes` and `partials`.
- To give them styles and scripts, the `assets` directory is used.

### Other root files

- Package.json is used to manage Node.js dependencies shown below:

```json
{
  "name": "hugo-base-module",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/agsayyed/ags-module-template.git"
  },
  "author": "Abdul Sayyed <s.ghafoor@outlook.com>",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/agsayyed/ags-module-template/issues"
  },
  "homepage": "",
  "devDependencies": {
    "prettier-plugin-go-template": "^0.0.15"
  }
}
```

- Every module would have its config.yml file. This file is used to provide default configuration options for the module.

```toml
[module.hugoVersion]
min = "0.110.0"
```

- It can suffice with this information but can also have the following information:

```toml
[module.hugoVersion]
min = "0.110.0"

[[module.imports]]
path = "github.com/hugomods/icons/vendors/bootstrap"

[[module.imports]]
path = "github.com/hugomods/images"

[[module.imports]]
path = "github.com/hugomods/base"

[params.bootstrap.config_toggle]
langs = ["toml", "yaml", "json"]

[params.bootstrap.article_cards]
limit = 12
image_height = 240
```

### Adding Prettierrc file

- Using `npm i` install prettier-plugin-go-template, it is present in package.json file.
- Create prettierrc file with following contents. The word override meaning is to ignore html file or anyother file mentioned there, e.g., `["*.html, *.md"]` in the file.

```json
{
  "plugins": ["prettier-plugin-go-template"],
  "goTemplateBracketSpacing": true,
  "overrides": [
    {
      "files": ["*.html"],
      "options": {
        "parser": "go-template",
        "bracketSameLine": true
      }
    }
  ]
}
```

### Example: Creating a Shortcode

Let's create a simple shortcode that displays an alert message.

- Step 1: Create the shortcode file:

- Create the file `layouts/shortcodes/ags/base/alert.html`:

```go
<div class="alert alert-{{ .Get "type" | default "info" }}">
    {{ .Inner | markdownify }}
</div>
```

- Step 2: Create a partial file:

Create the file `layouts/partials/ags/base/head.html`:

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{ .Title }}</title>
</head>
```

### Example: Creating a Partial

You can create custom partials in a similar way within the `layouts/partials` directory.

- Module Configuration (config.toml - Optional)

You can provide default configuration options for your module in a `config.toml` file at the root of your module. For `ags-module-template`, it's optional, but here's an example if you wanted to set a default alert type:

```toml
[params]
  alertType = "info"
```

### Alert Shortcode

Use the `alert` shortcode to display an alert message:

```markdown
{{</* ags/base/alert type="warning" */>}}
This is a warning message.
{{</* /ags/base/alert */>}}
```

### Head Partial

```html
{{ partial "ags/base/head.html" . }}
```

## License

This module is released under the MIT License.

### Local Development Workflow

- Step 1: Create a Test Hugo Site

- Create a new directory outside your module, for example, `hugo-test-site`.
- Inside `hugo-test-site`, create the basic Hugo site structure:

  ```bash
  hugo-test-site/
  ├── content/
  ├── layouts/
  ├── static/
  ├── go.mod
  ├── go.sum
  └── config.toml
  ```

- Initialize `hugo-test-site` as a Go module using the following command.

  ```bash
  go mod init hugo-test-site
  ```

- Step 2: Add the `ags-module-template` Module to Your Test Site

- In your `hugo-test-site/config.toml`, add the following under the `module` section:

  ```toml
  [[module.imports]]
    path = "github.com/agsayyed/ags-module-template"
  ```

- In your test site's `go.mod` file, add a `replace` directive to point to your local module:

  ```go
  module hugo-test-site

  go 1.20

  replace github.com/agsayyed/ags-module-template => ../ags-module-template
  ```

- Step 3: Use the Module in Your Test Site

  - Create a new content file (e.g., `content/test.md`) and use the shortcode:

    ```markdown
    ---
    title: "Test Page"
    date: 2023-12-29
    ---

    {{</* ags/base/alert type="success" */>}}
    This is a test alert.
    {{</* /ags/base/alert */>}}
    ```

  - Add the partial to your layout template in `hugo-test-site`

    ```html
    <!DOCTYPE html>
    <html>
      {{ partial "ags/base/head.html" . }}
      <body>
        <main>
          <article>
            <header>
              <h1>{{ .Title }}</h1>
            </header>
            <div>{{ .Content }}</div>
          </article>
        </main>
      </body>
    </html>
    ```

- Step 4: Run the Test Site

  - From the `hugo-test-site` directory, run:

    ```bash
    hugo serve
    ```

    This will start the Hugo development server. You should see your alert shortcode rendered on the test page.

- Step 5: Using `hugo mod` Commands

  - `hugo mod get -u`: Updates the module (useful if you make changes to `ags-module-template`).
  - `hugo mod tidy`: Cleans up your `go.mod` and `go.sum` files.
  - `hugo mod vendor`: Creates a `_vendor` directory with your module's dependencies (for build reproducibility).

- Step 6: Debugging Common Issues

  - Shortcode not rendering:
    - Make sure you are using the correct shortcode syntax (e.g., `{{</* ags/base/alert */>}}`, not `{{< ags/base/alert >}}`).
    - Check for typos in the shortcode name or parameters.
    - Verify that the shortcode file is in the correct location (`layouts/shortcodes/ags/base/alert.html`).
  - Module not found:
    - Double-check that the module path in your `config.toml` and the `replace` directive in your `go.mod` are correct.
    - Run `hugo mod get -u` and `hugo mod tidy` to ensure the module is properly downloaded and linked.
  - Errors in the console:
    - Hugo usually provides helpful error messages in the console. Read them carefully to identify the source of the problem.

- Step 7: Best Practices for Local Development

  - Frequent testing: Test your module frequently as you develop it to catch errors early.
  - Use version control: Commit your changes regularly using Git.
  - Write clear code: Follow Go's coding conventions and write well-documented code.
  - Modular design: Break down complex functionality into smaller, reusable components (shortcodes, partials, or even other modules).

### Publishing the `ags-module-template` Module

- Step 1: Prepare Your Module for GitHub

  - LICENSE: Add a `LICENSE` file (e.g., MIT) to your module's root directory.
  - README.md: Make sure your `README.md` is comprehensive and up-to-date.
  - `.gitignore`: Create a `.gitignore` file to exclude unnecessary files from being committed to the repository. A typical `.gitignore` for a Hugo module might include:

    ```bash
    _vendor/
    resources/
    public/
    ```

  - Version Tagging: Use semantic versioning (e.g., `v1.0.0`, `v1.0.1`, `v1.1.0`, `v2.0.0`) when tagging your releases. You can create tags using Git:

    ```bash
    git tag -a v1.0.0 -m "Initial release of ags-module-template"
    git push origin v1.0.0
    ```

- Step 2: Create a GitHub Repository

  - Go to your GitHub account and create a new repository named `ags-module-template` (matching your module name).
  - Initialize the repository with a README (you can do this directly on GitHub).

- Step 3: Push Your Module to GitHub

  ```bash
  git remote add origin git@github.com:agsayyed/ags-module-template.git
  git branch -M main
  git push -u origin main
  ```

- Step 4: Module Verification

  - Hugo Module Proxy: Hugo uses a module proxy to fetch modules. Once your module is on GitHub and tagged, it should be automatically available through the proxy.
  - Testing: You can test if your module is accessible by adding it to a fresh Hugo site without using a `replace` directive. If Hugo can download the module successfully, it's working correctly.


[//]: # '! First I intneded to make this folder to develop a module but changed to a `template` folder to make it more generic. The above information is for the `ags-module-template` module While below was intended for previous `ags-base` module. Correct it and followt the tod convention so that it is easy to understand.'


---

[//]: # '!Start your work from here'

### Example Code and Files

You can find the complete example code for the `ags-module-template` module, including all the files mentioned above, in this GitHub repository:

[https://github.com/agsayyed/ags-module-template](https://github.com/agsayyed/ags-base)

## Part 2: Developing a Dependent Module (ags-utils)

Now, let's create a second module, `ags-utils`, that depends on the `ags-base` module.

### Directory Structure for `ags-utils`

```bash
ags-utils/
├── layouts/
│   └── shortcodes/
│       └── ags/
│           └── utils/
│               └── basealert.html
├── go.mod
├── go.sum
├── README.md
└── LICENSE
```

### Initializing the `ags-utils` Module

- Step 1: Create the module directory:

  ```bash
  mkdir ags-utils
  cd ags-utils
  ```

- Step 2: Initialize the Go module:

  ```bash
  go mod init github.com/agsayyed/ags-utils
  ```

  This creates a `go.mod` file:

  ```go
  module github.com/agsayyed/ags-utils

  go 1.20
  ```

### Implementing Functionality Dependent on `ags-base`

- Example: Creating a Shortcode that Uses `ags-base`

  Let's create a shortcode in `ags-utils` that extends the functionality of the `alert` shortcode from `ags-base`.

  - Step 1: Create the shortcode file:

    Create the file `layouts/shortcodes/ags/utils/basealert.html`:

    ```html
    {{ $baseAlert := partial "shortcodes/ags/base/alert.html" . }}
    <div class="my-custom-wrapper">{{ $baseAlert }}</div>
    ```

    This shortcode uses the `alert` shortcode from `ags-base` by calling it as a partial and wrapping it in a custom `div`.

  - Step 2: Require `ags-base` in `go.mod`:

    Update your `ags-utils/go.mod` file to require the `ags-base` module:

    ```go
    module github.com/agsayyed/ags-utils

    go 1.20

    require github.com/agsayyed/ags-base v1.0.0
    ```

    Run `go mod tidy` in the `ags-utils` directory to download the dependency.

### Documentation for `ags-utils` (README.md)

````markdown
# ags-utils

A Hugo module that provides utilities and extends the `ags-base` module.

## Installation

Add the module to your Hugo site's `config.toml`:

```toml
[[module.imports]]
  path = "github.com/agsayyed/ags-utils"
[[module.imports]]
  path = "github.com/agsayyed/ags-base"
```
````

## Usage

### basealert Shortcode

Wraps the `ags-base` alert shortcode with a custom `div`:

```markdown
{{</* ags/utils/basealert type="info" */>}}
This alert is from ags-utils, using ags-base!
{{</* /ags/utils/basealert */>}}
```

## License

This module is released under the MIT License.


### Local Development and Testing

- Follow the same local development steps as with `ags-base`, but add both `ags-base` and `ags-utils` to your test site's `config.toml` and use appropriate `replace` directives in your test site's `go.mod`.
- In your test site's `go.mod` file, add a `replace` directive to point to your local module:

  ```go
  module hugo-test-site

  go 1.20

  replace github.com/agsayyed/ags-base => ../ags-base
  replace github.com/agsayyed/ags-utils => ../ags-utils
  ```

### Publishing `ags-utils`

- Follow the same publishing steps as `ags-base`. Make sure to tag your releases using semantic versioning.

### Example Code for `ags-utils`

You can find the complete example code for the `ags-utils` module here:

[https://github.com/agsayyed/ags-utils](https://github.com/agsayyed/ags-utils)

## Part 3: Using a `_vendor` Folder for Reproducible Builds

### Why Use `_vendor`?

- Reproducibility: Ensures that your Hugo site builds the same way every time, regardless of changes to external module dependencies.
- Offline Builds: Allows you to build your site even when you're offline or if the Hugo module proxy is unavailable.

### How to Use `_vendor`

- Step 1: Vendor Your Dependencies

  - In your Hugo site's root directory (e.g., `hugo-test-site`), run:

    ```bash
    hugo mod vendor
    ```

    This creates a `_vendor` folder containing all your module dependencies.

- Step 2: Update `.gitignore`

  - Add `_vendor/` to your site's `.gitignore` file to exclude the vendored dependencies from version control.

- Step 3: Build with Vendored Dependencies

  - When you run `hugo` or `hugo serve`, Hugo will now use the modules in the `_vendor` folder instead of fetching them from the proxy.

## Part 4: GitHub Actions for Automated Release

### Why Use GitHub Actions?

- Automation: Automates the process of tagging and releasing your modules.
- Consistency: Ensures that releases are created consistently and follow the same steps every time.
- Efficiency: Saves you time and effort by automating manual tasks.

### Example GitHub Actions Workflow

Here's an example of a GitHub Actions workflow that automatically creates a new release whenever you push a tag that matches the pattern `v*.*.*`:

- Create the workflow file:

  Create the file `.github/workflows/release.yml` in your module repository (e.g., `ags-base`):

  ```yaml
  name: Release

  on:
    push:
      tags:
        - v*.*.*

  jobs:
    release:
      runs-on: ubuntu-latest
      steps:
        - name: Checkout code
          uses: actions/checkout@v3

        - name: Create Release
          id: create_release
          uses: actions/create-release@v1
          env:
            GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          with:
            tag_name: ${{ github.ref }}
            release_name: Release ${{ github.ref }}
            draft: false
            prerelease: false

        - name: Upload Release Asset (Optional)
          id: upload-release-asset
          uses: actions/upload-release-asset@v1
          env:
            GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          with:
            upload_url: ${{ steps.create_release.outputs.upload_url }}
            asset_path: ./ # Replace with path to any assets you want to upload
            asset_name: # Name of the asset
            asset_content_type: # Content type of the asset
  ```

### How It Works

- Trigger: The workflow is triggered when you push a tag that matches the pattern `v*.*.*` (e.g., `v1.0.0`, `v2.1.5`).
- Checkout: The `actions/checkout@v3` action checks out your code.
- Create Release: The `actions/create-release@v1` action creates a new release on GitHub, using the tag name as the release name.
- Upload Asset (Optional): The `actions/upload-release-asset@v1` action uploads any assets you want to include in the release (e.g., pre-built binaries, documentation). You'll need to customize the `asset_path`, `asset_name`, and `asset_content_type` according to your needs.

### Using the Workflow

1. **Create a tag:**

    ```bash
    git tag -a v1.1.0 -m "Release v1.1.0"
    ```

2. **Push the tag:**

    ```bash
    git push origin v1.1.0
    ```

    This will trigger the GitHub Actions workflow, which will create a new release on GitHub.

This comprehensive guide covers the essential aspects of developing, testing, and publishing Hugo modules using Go. Remember to adapt the code examples and instructions to your specific needs and module functionality. Feel free to ask any further questions.
