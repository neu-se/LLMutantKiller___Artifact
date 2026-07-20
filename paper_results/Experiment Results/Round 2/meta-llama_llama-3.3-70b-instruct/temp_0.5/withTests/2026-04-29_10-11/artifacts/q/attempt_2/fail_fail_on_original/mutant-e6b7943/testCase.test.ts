import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should detect the mutation in isStopIteration function", () => {
        // Create a new Error object
        const error = new Error();

        // Test the original code
        const originalIsStopIteration = Q.isStopIteration;
        expect(originalIsStopIteration(error)).toBe(false);

        // Simulate the mutation by changing the isStopIteration function
        const mutatedIsStopIteration = () => true;
        Q.isStopIteration = mutatedIsStopIteration;
        expect(Q.isStopIteration(error)).toBe(true);

        // Restore the original isStopIteration function
        Q.isStopIteration = originalIsStopIteration;
    });
});