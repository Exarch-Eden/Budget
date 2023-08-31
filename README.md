# Budget
Personal finance management app with an emphasis on simplicity and user experience.

## Frontend Tech Stack
A list of all the libraries and frameworks used in the frontend.

- [Material Components](https://developer.android.com/develop/ui/views/theming/look-and-feel)
    - [Material Motion Transitions General Talk](https://www.youtube.com/watch?v=iuvmnxTRgRM)
    - [Material Motion Implementation Tutorial](https://www.youtube.com/watch?v=RzdWILMmAZs)
- [UMLet](https://marketplace.visualstudio.com/items?itemName=TheUMLetTeam.umlet)

### Libraries in consideration
A list of libraries that may be added to the tech stack.

- [Data Binding](https://developer.android.com/topic/libraries/data-binding)

## Application Structure
The application structure follows [Android Studio's recommended layout](https://developer.android.com/topic/architecture).

The layout is as follows:
```
Project
|
+-- UI Layer
|   |
|   +-- Features
|       |
|       +-- UI Elements
|       +-- UI State (State Holders)
|
|
+-- Data Layer
    |
    +-- Repositories
        |
        +-- Data Source
```

For more information regarding the app structure layers, refer to these documentation links:
- [UI Layer](https://developer.android.com/topic/architecture/ui-layer)
- [Domain Layer](https://developer.android.com/topic/architecture/domain-layer)
- [Data Layer](https://developer.android.com/topic/architecture/data-layer)

For more information regarding the tree layout format, refer to these links:
- [StackOverflow Thread](https://stackoverflow.com/questions/19699059/print-directory-file-structure-with-icons-for-representation-in-markdown)
- [StackExchange Thread](https://meta.stackexchange.com/questions/147467/is-there-a-good-way-to-represent-file-structure-in-a-question-answer)

## Application Modularization
The application dependency graph follows [Android Studio's modularization principles](https://developer.android.com/topic/modularization)

TODO: insert dependency graph

## Other References
Other links to documentation and threads involving relevant principles or logic in this app's development:

- [Example app repo](https://github.com/android/nowinandroid)

## Unit Testing

TODO: research JUnit testing and CI/CD integration with github workflows (look for something similar to CircleCI or learn to make own build file)
