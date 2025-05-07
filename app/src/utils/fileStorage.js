import * as FileSystem from 'expo-file-system';

const DB_PATH = FileSystem.documentDirectory + 'formData.json';

// Initialize the file if it doesn't exist
export const initStorage = async () => {
  const fileInfo = await FileSystem.getInfoAsync(DB_PATH);
  if (!fileInfo.exists) {
    await FileSystem.writeAsStringAsync(DB_PATH, JSON.stringify([]));
  }
};

// Read all stored form data from the file
export const readAllDocuments = async () => {
  try {
    const content = await FileSystem.readAsStringAsync(DB_PATH);
    return JSON.parse(content);
  } catch (error) {
    console.error('Failed to read data', error);
    return [];
  }
};

// Save new form data to the file
export const saveDocument = async (formData) => {
  try {
    const existingData = await readAllDocuments();
    const updatedData = [...existingData, formData];
    await FileSystem.writeAsStringAsync(DB_PATH, JSON.stringify(updatedData));
  } catch (error) {
    console.error('Failed to save form data', error);
  }
};
