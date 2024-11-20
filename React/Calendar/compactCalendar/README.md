# Calendar Component

A fully functional React calendar component with a minimalist design. This component allows users to navigate between months, view days of the week, and select specific dates. It's styled using TailwindCSS and leverages the **date-fns** library for date manipulation.

## Features

- Navigate between months.
- Highlights the current day.
- Marks weekends with a distinct style.
- Fully keyboard-accessible (supports `Enter` and `Space` for selection).
- Customizable and reusable.

---

## Installation and Setup

### 1. Prerequisites

Ensure you have the following installed in your development environment:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **React** (v17 or higher)

### 2. Required Dependencies

Install the required libraries:

```bash
npm install react date-fns tailwindcss
```

Alternatively, if you use yarn:

```
yarn add react date-fns tailwindcss
```

### 3. Setting up TailwindCSS

If TailwindCSS is not already set up in your project, follow these steps:

#### 1. Install TailwindCSS and its dependencies:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

#### 2. Configure Tailwind in your tailwind.config.js file:

```javascript
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    theme: {
        extend: {},
    },
    plugins: [],
};
```

#### 3. Add Tailwind directives to your CSS file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Usage

Include the calendar component in your application:

```javascript
import React from 'react';
import Calendar from './components/Calendar'; // Adjust the path as needed

const App = () => {
    return (
        <div className="app-container">
            <h1 className="text-center text-2xl font-bold mb-4">React Calendar</h1>
            <Calendar />
        </div>
    );
};

export default App;
```

## File Structure

```bash
src/
│
├── components/
│   └── Calendar.jsx  # The main calendar component
│
├── styles/
│   └── index.css     # TailwindCSS styling
│
└── App.jsx           # Entry point for the app
```

## Customization

You can easily customize the styles and functionality of this component:

### 1. Change Colors and Styles
Modify the Tailwind classes in the component to fit your design system.

### 2. Add Event Handlers
Extend the onDateClick function to integrate your logic (e.g., fetching events for the selected date).

## Dependencies

| Dependency    | Version     | Description                              |
|---------------|-------------|------------------------------------------|
| `react`       | ^17.0.0     | Core React library                       |
| `date-fns`    | ^2.0.0      | Utility library for date manipulation    |
| `tailwindcss` | ^3.0.0      | Utility-first CSS framework              |

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests. Make sure to adhere to the Contributor Covenant.

## Author
Developed by adrian-9559. If you have any questions or feedback, reach out via adrian.escribano3@gmail.com.

Enjoy using the React Calendar! 🎉
