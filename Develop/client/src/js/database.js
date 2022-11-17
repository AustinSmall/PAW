import { openDB } from "idb";

const initdb = async () =>
	openDB("jate", 1, {
		upgrade(db) {
			if (db.objectStoreNames.contains("jate")) {
				console.log("jate database already exists");
				return;
			}
			db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
			console.log("jate database created");
		},
	});

// Accepts some content and add it to the database.
export const putDb = async (content) => {
	console.log("PUT to the database");

	// Create a connection to the database and version we want to use.
	const jateDb = await openDB("jate", 1);

	// Create a new transaction and specify the database and data privileges.
	const tx = jateDb.transaction("jate", "readwrite");

	// Open up the desired object store.
	const store = tx.objectStore("jate");

	// Use the .put() method to update data in the database.
	// The text editor consists of one field of information that is repeatedly retrieved and updated.
	const request = store.put({ id: 1, value: content });

	// Get confirmation of the request.
	const result = await request;
	console.log("Data saved to the database", result);
};

export const getDb = async () => {
	console.log("GET from the database");

	const jateDb = await openDB("jate", 1);

	const tx = jateDb.transaction("jate", "readonly");

	const store = tx.objectStore("jate");

	const request = store.get(1);

	const result = await request;
	result
		? console.log("Data retrieved from the database", result.value)
		: console.log("Data not found in the database");
	return result?.value;
};

initdb();