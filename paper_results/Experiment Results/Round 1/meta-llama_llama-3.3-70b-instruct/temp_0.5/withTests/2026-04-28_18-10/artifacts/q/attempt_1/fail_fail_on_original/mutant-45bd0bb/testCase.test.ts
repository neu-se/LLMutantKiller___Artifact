import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should create an object with Object.create when available", () => {
        // Create a new Q promise
        const promise = Q();

        // Check if Object.create is available
        if (typeof Object.create === "function") {
            // If available, check if the promise's constructor is Object
            expect(promise.constructor).toBe(Object);
        } else {
            // If not available, check if the promise's constructor is a function
            expect(typeof promise.constructor).toBe("function");
        }
    });
});