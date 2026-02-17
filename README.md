# Smart Task Management Dashboard

## Problem Statement
Managing daily tasks can get messy, especially for individuals and small teams who need something simple and fast.  
Many tools are either overloaded with features or depend on backend setup, which is not always practical.

This project solves that by building a **frontend-only task management dashboard** where users can:
- create tasks,
- track progress,
- manage priorities,
- and organize work in one clear interface.

All data is stored on the client side using **browser localStorage**.

## Functional Requirements
- Add new tasks with title, description, priority, and due date
- Edit and delete existing tasks
- Track task status: `To Do`, `In Progress`, `Completed`
- Show visual indicators for different task statuses
- Filter tasks by status and priority
- Sort tasks by due date
- Persist task data using browser localStorage
- Display dashboard summary: total tasks, completed tasks, pending tasks

## Tech Stack
- React.js (Functional Components)
- JavaScript (ES6+)
- CSS / CSS Modules / Tailwind CSS (optional)
- Browser localStorage API

## Project Milestones (9-Day Work Plan)

### Day 1: Requirement analysis and UI planning
Spent time understanding the exact problem, defining the user flow, and deciding what screens/components were needed.  
Prepared a basic UI structure for the dashboard.

### Day 2: Project setup and base component creation
Initialized the React project, cleaned starter files, and created the base component structure (form area, task list area, summary section).

### Day 3: Task creation form and task display
Built the task input form with fields for title, description, priority, and due date.  
Added task rendering so newly created tasks appear in the dashboard.

### Day 4: Edit and delete task functionality
Implemented update and delete actions for each task.  
Ensured task list updates instantly after edits or removal.

### Day 5: Task status management
Added status tracking workflow (`To Do`, `In Progress`, `Completed`) and made status changes visible in the UI with clear indicators.

### Day 6: Filters and sorting
Introduced filtering by status and priority.  
Added sorting by due date so users can focus on upcoming tasks first.

### Day 7: localStorage integration
Connected task state with localStorage so data is saved across page refreshes and browser restarts.

### Day 8: Dashboard summary and UI improvements
Added summary cards for total/completed/pending tasks.  
Refined spacing, colors, and visual consistency for a cleaner user experience.

### Day 9: Final testing and GitHub submission
Performed final checks, fixed minor UI/logic issues, reviewed edge cases, and prepared the project for GitHub submission.

## Suggested Commit Messages (Day-wise)
1. `Day 1: Analyze requirements and plan dashboard UI structure`
2. `Day 2: Setup React project and create base component layout`
3. `Day 3: Implement task creation form and task rendering`
4. `Day 4: Add edit and delete functionality for tasks`
5. `Day 5: Implement task status workflow with visual indicators`
6. `Day 6: Add task filtering by status/priority and due-date sorting`
7. `Day 7: Integrate localStorage for persistent task data`
8. `Day 8: Build dashboard summary cards and polish UI`
9. `Day 9: Final testing, bug fixes, and prepare GitHub submission`
