import { useridenTITY2 } from './login.js';
let userCredits; // Define a global variable to store the credits

export async function getUserDetails(useridenTITY2) {
    try {
        // Fetch data from db.json
        const response = await fetch('db.json');
        const data = await response.json();

        // Find the student with the given userId
        const student = data.students.find(student => student.id === useridenTITY2);

        // If the student is found, assign the credits to the global variable
        if (student) {
            userCredits = student[useridenTITY2].credits;
        } else {
            userCredits = null; // Set to null if student is not found
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        userCredits = null; // Set to null in case of error
    }
}

// Export the userCredits variable so it can be accessed from other files
export { userCredits };
