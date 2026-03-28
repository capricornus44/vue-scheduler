# Vue Scheduler

A modern, high-performance calendar and scheduling application built with **Vue 3** and **TypeScript**. This project features a sophisticated event layout engine, customizable settings, and a robust state management system using **TanStack Query**.

## 🚀 Technologies

- **Frontend**: Vue 3 (Composition API, `<script setup>`)
- **Styling**: Tailwind CSS 4
- **State Management**: TanStack Vue Query (v5)
- **Date Utilities**: date-fns
- **UI Components**: Radix UI (via reka-ui) & Lucide Icons
- **Build Tool**: Vite
- **Package Manager**: Bun

## ✨ Features

- **Multiple Views**: Day, Week, and Month views for comprehensive scheduling.
- **Event Management**: Create, edit, and delete events with a user-friendly dialog system.
- **Smart Layout**: Advanced algorithm for handling overlapping events (clustering and columnar layout).
- **Customizable Settings**:
  - Show/Hide weekends.
  - Custom working hours highlight.
  - "Start week on Sunday" preference.
  - Compact view mode.
- **Optimistic UI**: Experience lightning-fast updates. Changes are reflected instantly in the UI while synchronization happens in the background.

## 📡 Backend Simulation

The project includes a robust **mock API** layer:
- **Persistence**: Data is saved to `localStorage`, making your changes persistent across page reloads.
- **Simulated Latency**: API calls include artificial delays to mimic real-world network behavior.
- **Async Architecture**: The codebase is fully prepared for a transition to a real backend (REST or GraphQL) without major architectural changes.

## 🛠 Project Setup

```sh
bun install
```

### Dev Server

```sh
bun dev
```

### Production Build

```sh
bun run build
```

### Linting

```sh
bun lint
```
