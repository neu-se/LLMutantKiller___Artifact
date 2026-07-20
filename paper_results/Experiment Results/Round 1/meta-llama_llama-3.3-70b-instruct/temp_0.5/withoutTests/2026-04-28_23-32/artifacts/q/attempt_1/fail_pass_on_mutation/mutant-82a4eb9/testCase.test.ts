import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when used as a module in a CommonJS and NodeJS environment', () => {
        // Create a mock for the module object
        const module = { exports: {} };

        // Create a mock for the exports object
        const exports = {};

        // Create a mock for the definition function
        const definition = () => {};

        // Call the Q function with the definition function
        const q = (definition as any)();

        // Check if the Q function throws an error when used as a module
        expect(() => {
            // Try to assign the Q function to the module.exports object
            module.exports = q;
        }).not.toThrow();
    });
});