const uploadForm = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const fileLabelText = document.getElementById('fileLabelText');
const output = document.getElementById('output');

fileInput.addEventListener('change', () => {
    const fileName = fileInput.files[0]?.name || "No file selected";
    fileLabelText.textContent = fileName;
});

uploadForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!fileInput.files.length) {
        output.innerHTML = "Please select a file to upload.";
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    output.innerHTML = "Uploading...";

    try {
        const response = await fetch('https://file.io', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
            output.innerHTML = `
                <strong>File uploaded successfully!</strong><br>
                <a href="${data.link}" target="_blank">${data.link}</a>
            `;
        } else {
            throw new Error(data.message || "Unknown error occurred");
        }
    } catch (error) {
        output.innerHTML = `An error occurred: ${error.message}`;
    }
});
