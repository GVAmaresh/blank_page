import { openDB } from "idb";

export interface BlankPageInterface {
  id?: number;  // The ID can be optional for new entries
  title: string;
  description: string;
  context: string;
  emoji: string;
}

const DB_NAME = "blank_page";
const STORE_NAME = "blank_page_store";

// Initialize the IndexedDB
export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true, // Automatically increment IDs for new entries
        });
      }
    },
  });
}

// Add a new blank page
export const addBlankPage = async (data: BlankPageInterface) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  await store.add(data); // Use `add` to ensure new entry creation
  await tx.done; // Wait for the transaction to finish
};

// Get all blank pages
export const getAllBlankPages = async () => {
  const db = await initDB();
  return await db.getAll(STORE_NAME); // Returns all entries in the store
};

// Get a single blank page by ID
export const getBlankPage = async (id: number) => {
  const db = await initDB();
  const page = await db.get(STORE_NAME, id); // Retrieve the page by ID
  if (!page) {
    throw new Error(`Page with ID ${id} not found`);
  }
  return page; // Return the found page
};

// Update an existing blank page by ID
export const updateBlankPage = async (id: number, updatedData: BlankPageInterface) => {
  const db = await initDB();
  const existingPage = await getBlankPage(id); // Ensure the page exists before updating
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  await store.put({ ...existingPage, ...updatedData }); // Merge existing and updated data
  await tx.done; // Wait for the transaction to finish
};

// Delete a blank page by ID
export const deleteBlankPage = async (id: number) => {
  const db = await initDB();
  const existingPage = await getBlankPage(id); // Ensure the page exists before deleting
  if (!existingPage) {
    throw new Error(`Cannot delete, page with ID ${id} not found`);
  }
  const tx = db.transaction(STORE_NAME, "readwrite");
  await tx.objectStore(STORE_NAME).delete(id); // Delete the page by ID
  await tx.done; // Wait for the transaction to finish
};
