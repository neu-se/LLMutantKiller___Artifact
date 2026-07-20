import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return a promise when called with a value in the original code', () => {
        // The function should return a promise
        const promise = Q(1);

        // Check if the returned value is a promise
        expect(promise.then).toBeDefined();
        expect(promise.catch).toBeDefined();
    });

    it.skip('should throw an error when called with a value in the mutated code', () => {
        // Set up the global variables
        const originalWindow = global.window;
        global.window = "";

        // The function should throw an error
        expect(() => {
            Q(1);
        }).toThrowError();

        // Restore the original global variables
        global.window = originalWindow;
    });
});