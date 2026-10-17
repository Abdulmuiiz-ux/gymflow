
const equipmentContainer = document.querySelector("#equipment");

async function displayEquipment() {
    equipmentContainer.innerHTML = `
        <h2>Gym equipment</h2>
        <p>Loading equipment...</p>
    `;

    try {
        const { data, error } = await supabaseClient
            .from("equipment_latest_status")
            .select("*")
            .order("equipment_id", { ascending: true });

        if (error) {
            throw error;
        }

        if (!data || data.length === 0) {
            equipmentContainer.innerHTML = `
                <h2>Gym equipment</h2>
                <p>No equipment found.</p>
            `;
            return;
        }

        equipmentContainer.innerHTML = `
            <h2>Gym equipment</h2>
            <p class="equipment-intro">
                Check the latest reported status before choosing your exercise.
            </p>

            <div class="equipment-grid">
                ${data.map(item => {
                    const status = item.status || "Unknown";
                    const statusClass = status
                        .toLowerCase()
                        .replaceAll(" ", "-");

                    return `
                        <article class="equipment-card">
                            <h3>${escapeHTML(item.name)}</h3>
                            <p>${escapeHTML(item.category)}</p>
                            <span class="status status-${statusClass}">
                                ${escapeHTML(status)}
                            </span>
                            <p class="reported-time">
                                ${item.reported_at
                                    ? `Last reported: ${new Date(item.reported_at).toLocaleString()}`
                                    : "No reports yet"}
                            </p>
                        </article>
                    `;
                }).join("")}
            </div>
        `;
    } catch (error) {
        console.error("Error loading equipment:", error);

        equipmentContainer.innerHTML = `
            <h2>Gym equipment</h2>
            <p>We couldn't load equipment right now. Please try again later.</p>
        `;
    }
}

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

displayEquipment();
