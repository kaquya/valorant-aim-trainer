# vTune AIM

vTune AIM is a browser-based Valorant aim trainer and sensitivity analysis platform built with React, TypeScript, and Vite.

The goal of vTune AIM is to help players:

- Find a comfortable and consistent Valorant sensitivity
- Analyze overflicking and underflicking behavior
- Practice Valorant-focused aiming drills
- Improve crosshair reset discipline
- Train using realistic scenarios instead of random target spam

---

## Features

### Sensitivity Finder

The sensitivity finder analyzes:

- DPI
- Current Valorant sensitivity
- Mouse movement behavior
- Overflicking
- Underflicking
- Target correction patterns

The system then recommends whether the player's sensitivity should:

- Increase
- Decrease
- Stay unchanged

---

### Valorant-Focused Training Modes

#### Microflicks

Small precision flicks around the center area.

Designed to simulate short-range correction flicks common in Valorant gunfights.

#### Center Reset

Players must return to center after every flick.

Focuses on:

- Crosshair reset discipline
- Controlled movement
- Consistent recentering

#### Headline Taps

Targets appear along a head-level lane.

Focuses on:

- Head-level crosshair placement
- Tap accuracy
- Horizontal precision

#### Angle Clear

Targets appear on common left/right clearing zones.

Players must reset between peeks.

Focuses on:

- Angle isolation
- Controlled clearing
- Resetting before re-engaging

---

## Difficulty System

The trainer includes:

- Easy
- Normal
- Hard

Difficulty changes:

- Target size
- Spawn area size
- Precision requirements

---

## Pointer Lock Aim System

vTune AIM uses browser pointer lock for FPS-style aim control.

This allows:

- Mouse movement simulation
- Sensitivity emulation
- Crosshair-based aiming
- Flick tracking

---

## Settings

Users can configure:

- DPI
- Valorant sensitivity
- Mousepad size
- Training duration
- Audio preferences
- Hit feedback

Settings are currently stored locally using localStorage.

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- CSS

### Deployment

- Vercel

---

## Project Structure

```txt
src/
├── app/
├── components/
├── features/
│   ├── assessment/
│   ├── sensitivity/
│   ├── settings/
│   └── trainer/
├── pages/
├── styles/
└── types/
```

---

## Development Workflow

### Main Branches

```txt
main
develop
```

### Branch Naming

```txt
feature/...
fix/...
docs/...
chore/...
```

---

## Commit Convention

### Features

```txt
feat(trainer): add pointer lock aiming
```

### Fixes

```txt
fix(trainer): correct center reset logic
```

### Chores

```txt
chore(vite): configure project setup
```

### Documentation

```txt
docs(readme): update project overview
```

---

## Getting Started

### Clone Repository

```bash
git clone <repository-url>
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Build Project

```bash
npm run build
```

---

## Current Status

### Implemented

- Settings system
- Sensitivity finder
- Sensitivity assessment
- Pointer lock aiming
- Multiple trainer modes
- Difficulty system
- Result statistics
- Crosshair reset logic
- Local settings persistence

### Planned

- Backend authentication
- Cloud save support
- User accounts
- Performance history
- Aim analytics dashboard
- Advanced sensitivity recommendations
- Training playlists
- Session replay analysis
- Leaderboards

---

## Disclaimer

This project is a fan-made aim training tool for VALORANT players.

It is not endorsed, sponsored, or affiliated with Riot Games.

VALORANT and Riot Games are trademarks of Riot Games, Inc.

---

## Vision

vTune AIM aims to become a focused alternative to generic aim trainers by emphasizing:

- Valorant-specific mechanics
- Practical aim habits
- Realistic training patterns
- Sensitivity optimization
- Structured improvement