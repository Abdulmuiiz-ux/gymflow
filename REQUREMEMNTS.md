# GymFlow — Version 1 Requirements

## Purpose

GymFlow helps gym members find equipment availability and suitable alternative exercises when their preferred equipment is occupied.

## Target Users

* Gym members who want to reduce waiting time.
* Gym members who need alternative exercises.
* Gym staff may be involved in future versions.

## Core Features

1. Browse and search gym equipment.
2. View reported availability: Available, Occupied or Out of Service.
3. Submit community availability reports.
4. View the latest report timestamp.
5. Find alternative exercises based on the target muscle group and available equipment.
6. Filter equipment by category and status.

## Functional Requirements

* FR1: Display an equipment directory.
* FR2: Display the latest reported status for each item.
* FR3: Allow users to submit equipment status reports.
* FR4: Record the timestamp of each report.
* FR5: Allow filtering and searching.
* FR6: Suggest suitable alternative exercises.
* FR7: Identify stale availability information.
* FR8: Apply basic protections against invalid and excessive reports.

## Non-Functional Requirements

* Responsive mobile-first design.
* Simple and accessible interface.
* Prompt loading under normal conditions.
* Input validation and appropriate access controls.
* Minimal collection of personal information.
* Clear communication that community reports are not guaranteed live data.

## Initial Technology

* HTML for structure.
* CSS for styling.
* JavaScript for functionality.
* Sample JavaScript data for the first prototype.
* A shared database and backend in a later development stage.

## Out of Scope

* Sensors and computer vision.
* AI workout coaching.
* Gym occupancy prediction.
* Payments and subscriptions.
* Social networking features.

## Success Criteria

* Users can find equipment and view its latest reported status.
* Users can submit a report and see the updated information.
* Users can find a suitable alternative exercise.
* The interface works on mobile devices.
* Shared reports work across multiple devices when the backend is implemented.
