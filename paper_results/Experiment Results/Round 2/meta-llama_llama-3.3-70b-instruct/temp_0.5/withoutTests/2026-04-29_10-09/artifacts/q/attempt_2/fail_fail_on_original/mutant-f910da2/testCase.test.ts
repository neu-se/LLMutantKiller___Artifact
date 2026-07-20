import { Q } from "../../../../../q.js";

describe('Q.async', () => {
    it('should handle StopIteration correctly', () => {
        // Create a generator function that yields a promise
        function* generator() {
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

        // Use Q.async to create an async function from the generator
        const asyncFunction = Q.async(generator);

        // Call the async function and check if it returns the correct value
        expect(asyncFunction()).resolves.toEqual(undefined);
    });
});