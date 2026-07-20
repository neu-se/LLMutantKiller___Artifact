import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not throw an error when window is not an empty string in the original code', () => {
        // Set up the global variables
        const originalWindow = global.window;
        global.window = {};

        // The function should not throw an error in the original code
        expect(() => {
            Q();
        }).not.toThrowError();

        // Restore the original global variables
        global.window = originalWindow;
    });

    it.skip('should throw an error when window is an empty string in the mutated code', () => {
        // Set up the global variables
        const originalWindow = global.window;
        global.window = "";

        // The function should throw an error in the mutated code
        expect(() => {
            Q();
        }).toThrowError();

        // Restore the original global variables
        global.window = originalWindow;
    });
});