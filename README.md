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