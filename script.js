const API_URL = "https://pothole-detection-system-1-7uj2.onrender.com/detect";

function uploadFile() {

    const file = document.getElementById("fileInput").files[0];

    if (!file) {
        alert("Select a file");
        return;
    }

    document.getElementById("status").innerText =
        "Uploading...";

    navigator.geolocation.getCurrentPosition(async (position) => {

        const formData = new FormData();
        formData.append("file", file);
        formData.append("lat", position.coords.latitude);
        formData.append("lon", position.coords.longitude);

        const response = await fetch(API_URL, {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        const jobId = data.job_id;

        document.getElementById("status").innerText =
            "Processing video...";

        checkStatus(jobId);

    }, () => {
        alert("Location required");
    });
}

async function checkStatus(jobId) {

    const res = await fetch(
        `https://pothole-detection-system-1-7uj2.onrender.com/status/${jobId}`
    );

    const data = await res.json();

    if (data.status === "completed") {

        document.getElementById("status").innerText =
            "Completed";

        const fileUrl =
            "https://pothole-detection-system-1-7uj2.onrender.com" +
            data.output;

        document.getElementById("result").innerHTML = `
            <h3>Result</h3>
            <p>Potholes: ${data.count}</p>
            <video controls width="100%" src="${fileUrl}"></video>
        `;

    } else if (data.status === "failed") {

        document.getElementById("status").innerText =
            "Failed: " + data.error;

    } else {

        setTimeout(() => checkStatus(jobId), 2000);
    }
}
