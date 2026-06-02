const API_URL =
"https://pothole-detection-system-1-7uj2.onrender.com/detect";
 
function uploadFile() {

    const file =
        document.getElementById("fileInput").files[0];

    if (!file) {
        alert("Select a file");
        return;
    }

    document.getElementById("status").innerText =
        "Processing... Please wait";

    navigator.geolocation.getCurrentPosition(
        async (position) => {

            const formData = new FormData();

            formData.append("file", file);

                   
            formData.append(
                "lat",
                position.coords.latitude
            );
            formData.append(
                "lon",
                position.coords.longitude
            );

            const response =
                await fetch(API_URL, {
                    method: "POST",
                    body: formData
                });

            const result =
                await response.json();

            console.log("OUTPUT FILE:", result.output_file);         

            console.log(result);
            alert(JSON.stringify(result));

            document.getElementById("status").innerText =
                "Detection Complete";

            const resultDiv =
                document.getElementById("result");

           
            const fileUrl = "https://pothole-detection-system-1-7uj2.onrender.com" + result.output_file;
            if (
                file.type.startsWith("image/")
            ) {

                resultDiv.innerHTML = `
                <h3>Output Image</h3>
                <p><b>Potholes Detected:</b> ${result.count}</p>
                <p><b>GPS:</b>
                ${position.coords.latitude},
                ${position.coords.longitude}
                </p>
                <img
                src="${fileUrl}"
                width="100%">
                `;

            } else {

                resultDiv.innerHTML = `
                <h3>Output Video</h3>
                <p><b>Potholes Detected:</b> ${result.count}</p>
                <p><b>GPS:</b>
                ${position.coords.latitude},
                ${position.coords.longitude}
                </p>
                <video width="100%" controls>
                <source
                src="${fileUrl}"
                width="100%">
                </video>
                `;
            }
        },
        () => {
            alert(
                "Location access required"
            );
        }
    );
}
