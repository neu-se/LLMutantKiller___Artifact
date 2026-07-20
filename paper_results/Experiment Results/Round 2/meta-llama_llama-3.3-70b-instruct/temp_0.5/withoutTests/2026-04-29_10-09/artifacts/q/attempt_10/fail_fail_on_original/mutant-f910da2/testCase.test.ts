import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.async', () => {
    it('should handle StopIteration correctly', () => {
        // Define StopIteration
        class StopIteration extends Error {}

        // Create a generator function that yields a promise
        function* generator() {
            try {
                throw new StopIteration();
            } catch (e) {
                if (e instanceof QReturnValue) {
                    return e.value;
                } else {
                    throw e;
                }
            }
        }

        // Use Q.async to create an async function from the generator
        const asyncFunction = Q.async(generator);

        // Call the async function and check if it throws an error
        expect(() => asyncFunction()).toThrowError(StopIteration);

        // Remove the definition of StopIteration
        delete globalThis.StopIteration;

        // Create a new generator function that yields a promise
        function* newGenerator() {
            try {
                throw new Error();
            } catch (e) {
                if (e instanceof QReturnValue) {
                    return e.value;
                } else {
                    throw e;
                }
            }
        }

        // Use Q.async to create a new async function from the generator
        const newAsyncFunction = Q.async(newGenerator);

        // Call the new async function and check if it throws an error
        expect(() => newAsyncFunction()).toThrowError();
    });
});