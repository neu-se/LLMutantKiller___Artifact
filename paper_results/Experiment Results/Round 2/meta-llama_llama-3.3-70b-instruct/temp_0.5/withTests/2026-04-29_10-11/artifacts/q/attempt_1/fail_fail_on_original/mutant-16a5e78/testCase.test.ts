import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of the mutated file", () => {
        // The mutation affects the isFulfilled function, which checks if an object is a fulfilled promise.
        // The original code checks if the object is not a promise or if it's a fulfilled promise.
        // The mutated code checks if the object is not a promise and if it's a fulfilled promise.
        // This means the mutated code will return false for promises that are not fulfilled.

        // Test the original behavior
        expect(Q.isFulfilled(Q(10))).toBe(true);
        expect(Q.isFulfilled(Q.reject(new Error()))).toBe(false);

        // Test the mutated behavior
        // Since the mutation is in the q.js file, we need to test it directly
        // The mutated code will return false for promises that are not fulfilled
        expect(Q.isFulfilled(Q.reject(new Error()))).toBe(false);

        // To make the test fail for the mutated code, we can test a case where the object is not a promise
        // The original code returns true for non-promise values, but the mutated code returns false
        expect(Q.isFulfilled("hello")).toBe(true);
    });
});