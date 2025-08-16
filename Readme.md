### MCQ Hugo Module Built on top of HbStack

This module is used to create multiple choice questions in a Hugo website. It is a simple module that allows you to embed MCQ in a Hugo Site to use multiple choice questions. The module is designed to be easy to use and to provide a simple way to have multiple choice options displayed in Bootstrap accordion. The contents are displayed in a Bootstrap card component.

To embed in a markdown file, use the following shortcode:

```go
{{< agsayyed/mcq "folder_name.file_name" >}}
```

The shortcode takes the path to the file as an argument. The file should be in the `data` folder of the Hugo site. The format of the file is `yaml` and following convention is used.

```yaml
- question: "What is the difference between LLMs and GPTs?"
  options:
    - "1. LLMs are general-purpose models, while GPTs are specific implementations of LLMs."
    - "2. LLMs are used for image processing, while GPTs are used for text generation."
    - "3. LLMs are smaller in size compared to GPTs."
    - "4. LLMs are used for supervised learning, while GPTs are used for unsupervised learning."
  answer: "1. LLMs are general-purpose models, while GPTs are specific implementations of LLMs."
  weight: 1
  show: true
- question: "What are the main stages of a machine learning pipeline?"
  options:
    - "1. Data Collection, Data Preprocessing, Model Training, Model Evaluation"
    - "2. Data Collection, Model Training, Model Deployment"
    - "3. Data Preprocessing, Model Training, Model Evaluation"
    - "4. Data Collection, Data Preprocessing, Model Deployment"
  answer: "1. Data Collection, Data Preprocessing, Model Training, Model Evaluation"
  weight: 2
  show: true
```

For example, if file `mcq.yml` resides under a sub folder of the data directory name `qa`, so to embed the MCQ in a markdown file, use the following shortcode:

```go
{{< agsayyed/mcq "qa.mcq" >}}
```

> Note: No need to add the extension of the file and even the `data` name. Just provide the path to the file. The files are tested with `.yml` extension and not with `.yaml` extension.

The module will render the MCQ as shown below:

![mcq.png](./images/mcq.png)

---

### Package information

Package.json provides basic information. The module is itself built with the name `mcq` while the package folder name is `ags-mcq`. It is published on GitHub under the organisation name `agsayyed`.

To install the module, add the path in hugo.yaml or module.yaml file as shown below:

```yaml
module:
  imports:
    - path: github.com/agsayyed/mcq
```

And then use `hugo mod get -u` to get the module. If you use the module in your site and it is run with `-e development` flag, then the browser inspector window will show some info and logs, it is intentional and can be ignored. In production mode, it will not show any logs.

### Git

To provide versioning, tags are used with reference to semver. Even `npm version <patch, minor , major>` can also be used to update the version.
