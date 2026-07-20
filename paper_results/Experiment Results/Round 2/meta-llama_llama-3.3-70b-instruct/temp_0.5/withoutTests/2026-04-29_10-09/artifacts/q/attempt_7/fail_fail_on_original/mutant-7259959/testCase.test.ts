import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.async", () => {
    it("should handle the case when result.done is true", async () => {
        // Create a generator function that yields a promise
        function* generator() {
            try {
                yield Q.resolve(1);
                return Q.resolve(2);
            } catch (e) {
                throw e;
            }
        }

        // Use Q.async to create a promise for the generator
        const promise = Q.async(generator);

        // Wait for the promise to resolve
        const result = await promise;

        // Check that the result is correct
        expect(result).toBeUndefined();
    });
});