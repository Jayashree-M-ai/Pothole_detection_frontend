# -*- coding: utf-8 -*-
"""
Created on Tue Jun  2 12:21:17 2026

@author: Jayashree M
"""

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

            document.getElementById("status").innerText =
                "Detection Complete";

            const resultDiv =
                document.getElementById("result");

            if (
                file.type.startsWith("image/")
            ) {

                resultDiv.innerHTML = `
                <h3>Output Image</h3>
                <img
                src="https://pothole-detection-system-1-7uj2.onrender.com${result.output_file}"
                width="100%">
                `;

            } else {

                resultDiv.innerHTML = `
                <h3>Output Video</h3>
                <video width="100%" controls>
                <source
                src="https://pothole-detection-system-1-7uj2.onrender.com${result.output_file}">
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