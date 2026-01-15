# UniPlanner

🎓 **UniPlanner** - A comprehensive desktop productivity app designed specifically for university students to manage their academic life efficiently.

## Features

### ⏱️ Chronometer & Countdown Timer
- **Countdown Timer**: Perfect for Pomodoro technique and focused study sessions
- **Chronometer**: Track time spent on tasks and projects
- Preset timer options (5, 10, 15, 25, 30, 45, 60 minutes)
- Custom time setting
- Audio notifications when timer completes
- Start, pause, and reset controls

### 📝 Note-Taking App
- Create and manage unlimited notes
- Rich text editing
- Auto-save functionality
- Search through notes by title or content
- Local storage for privacy and offline access
- Clean and distraction-free interface

### 📅 Event Planner
- Schedule classes, exams, assignments, and study sessions
- Color-coded event types for easy identification
- Set date, time, location, and descriptions
- Filter events by type
- Mark events as completed
- Visual status indicators (today, upcoming, past)
- Automatic sorting by date and time
- Persistent storage using localStorage

## Installation

### Prerequisites
- Node.js (v20 or higher)
- npm (comes with Node.js)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yagizerdem/UniPlanner.git
cd UniPlanner
```

2. Install dependencies:
```bash
npm install
```

3. Run the application in development mode:
```bash
npm run dev
```
Then in a separate terminal:
```bash
npm run electron:dev
```

## Development

### Available Scripts

- `npm run dev` - Start Vite development server
- `npm run electron:dev` - Launch Electron in development mode
- `npm run build` - Build the React app for production
- `npm run package` - Package the app as a distributable executable

## Technology Stack

- **Electron**: Cross-platform desktop application framework
- **React**: UI library for building the interface
- **Vite**: Fast build tool and development server
- **CSS3**: Modern styling with gradients and animations
- **localStorage**: Client-side data persistence

## Usage

### Timer
1. Select between Countdown Timer or Chronometer mode
2. For Countdown: Set your desired time or choose a preset
3. Click Start to begin timing
4. Use Pause/Resume to control the timer
5. Reset to start over

### Notes
1. Click "New Note" to create a note
2. Type your title and content
3. Notes auto-save when you stop typing
4. Use search to find specific notes
5. Click the trash icon to delete notes

### Events
1. Click "Add Event" to create a new event
2. Fill in the event details (title, date, time, type, location, description)
3. Filter events by type using the filter buttons
4. Check off completed events
5. Events are color-coded by type and status

## License

ISC

## Author

yagizerdem
