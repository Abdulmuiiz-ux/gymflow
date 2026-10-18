
const equipmentContainer = document.querySelector("#equipment");

const REPORT_COOLDOWN_MS = 10000;
const equipmentCooldowns = new Map();

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

        if (error) throw error;

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
                    const statusClass = status.toLowerCase().replaceAll(" ", "-");

                    const reportedTime = item.reported_at
                        ? new Date(item.reported_at).toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true
                        })
                        : null;

                    return `
                        <article class="equipment-card equipment-${item.equipment_id}">
                            <h3>${escapeHTML(item.name)}</h3>
                            <p>${escapeHTML(item.category)}</p>

                            <span class="status status-${statusClass}">
                                ${escapeHTML(status)}
                            </span>

                            <p class="reported-time">
                                ${reportedTime
                                    ? `Last reported: ${reportedTime}`
                                    : "No reports yet"}
                            </p>

                            <p>Report equipment status:</p>

                            <div class="report-buttons">
                                <button type="button"
                                    onclick="submitReport(${item.equipment_id}, 'Available')">
                                    Available
                                </button>

                                <button type="button"
                                    onclick="submitReport(${item.equipment_id}, 'Occupied')">
                                    Occupied
                                </button>

                                <button type="button"
                                    onclick="submitReport(${item.equipment_id}, 'Out of Service')">
                                    Out of Service
                                </button>
                            </div>
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


async function submitReport(equipmentId, status) {
    const now = Date.now();
    const cooldownEnds = equipmentCooldowns.get(equipmentId) || 0;

    if (now < cooldownEnds) {
        const secondsLeft = Math.ceil((cooldownEnds - now) / 1000);
        alert(`Please wait ${secondsLeft} seconds before reporting this equipment again.`);
        return;
    }

    const buttons = document.querySelectorAll(".report-buttons button");
    buttons.forEach(button => button.disabled = true);

    try {
        const { error } = await supabaseClient
            .from("availability_reports")
            .insert({
                equipment_id: equipmentId,
                status: status
            });

        if (error) throw error;

        equipmentCooldowns.set(
            equipmentId,
            Date.now() + REPORT_COOLDOWN_MS
        );

        alert("Report submitted successfully! You can report this equipment again in 10 seconds.");

        await displayEquipment();

    } catch (error) {
        console.error("Error submitting report:", error);
        alert("We couldn't submit your report. Please try again.");

    } finally {
        buttons.forEach(button => button.disabled = false);
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
