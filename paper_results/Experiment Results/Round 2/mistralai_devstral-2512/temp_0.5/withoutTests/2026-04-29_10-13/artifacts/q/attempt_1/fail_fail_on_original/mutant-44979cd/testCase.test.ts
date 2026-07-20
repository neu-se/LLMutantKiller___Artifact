// Test to detect the mutation in q.js
import { Q } from "./q.js";

describe("Q module export detection", () => {
    it("should correctly export Q when running in a CommonJS environment", () => {
        // This test verifies that Q is properly exported in a CommonJS environment
        // The mutation changes the condition from checking `typeof exports === "object"`
        // to just `true`, which could break the export in some environments
        expect(Q).toBeDefined();
        expect(typeof Q).toBe("function");

        // Verify basic Q functionality works
        const promise = Q.resolve(42);
        return promise.then(value => {
            expect(value).toBe(42);
        });
    });
});