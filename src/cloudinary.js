// src/cloudinary.js
export async function uploadToCloudinary(file) {
  const url = `https://api.cloudinary.com/v1_1/dftodlkkt/upload`;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ngologos_unsigned');

  const response = await fetch(url, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error('Cloudinary upload failed');
  }
  const data = await response.json();
  return data.secure_url; // The URL you’ll save in Firestore
}
