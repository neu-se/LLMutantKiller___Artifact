import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when used as a module in a non-CommonJS environment', () => {
        // Create a mock for the module object
        const module = null;

        // Create a mock for the exports object
        const exports = {};

        // Create a mock for the definition function
        const definition = () => {};

        // Save the original exports and module variables
        const originalExports = global.exports;
        const originalModule = global.module;

        // Set the exports and module variables to the mock values
        global.exports = exports;
        global.module = module;

        // Call the Q function with the definition function
        const q = (definition as any)();

        // Check if the Q function throws an error when used as a module
        expect(() => {
            // Try to assign the Q function to the module.exports object
            // This should throw an error in the original code, but not in the mutated code
            if (typeof exports === "object" && typeof module === "object") {
                module.exports = q;
            }
        }).toThrowError("This environment was not anticipated by Q. Please file a bug.");

        // Restore the original exports and module variables
        global.exports = originalExports;
        global.module = originalModule;
    });
});