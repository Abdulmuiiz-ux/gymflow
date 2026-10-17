
const equipment = [
    { id: 1, name: "Leg Press", category: "Machine", status: "Occupied" },
    { id: 2, name: "Chest Press", category: "Machine", status: "Available" },
    { id: 3, name: "Lat Pulldown", category: "Machine", status: "Occupied" },
    { id: 4, name: "Treadmill", category: "Cardio", status: "Available" },
    { id: 5, name: "Exercise Bike", category: "Cardio", status: "Available" },
    { id: 6, name: "Dumbbells", category: "Free Weights", status: "Unknown" },
    { id: 7, name: "Barbell", category: "Free Weights", status: "Unknown" },
    { id: 8, name: "Bench Press", category: "Free Weights", status: "Occupied" }
];

const equipmentContainer = document.querySelector("#equipment");

function displayEquipment() {
    equipmentContainer.innerHTML = `
        <h2>Gym equipment</h2>
        <p class="equipment-intro">
            Check the latest reported status before choosing your exercise.
        </p>
        <div class="equipment-grid">
            ${equipment.map(item => `
                <article class="equipment-card">
                    <h3>${item.name}</h3>
                    <p>${item.category}</p>
                    <span class="status status-${item.status.toLowerCase().replaceAll(" ", "-")}">
                        ${item.status}
                    </span>
                </article>
            `).join("")}
        </div>
    `;
}

displayEquipment();
