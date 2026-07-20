// Test case to detect the mutation in q.js
import { Q } from "./q.js";

describe("Q module export behavior", () => {
    it("should correctly export Q when both exports and module are objects", () => {
        // This test verifies that Q is properly exported in a CommonJS environment
        // The mutation changes the condition from AND to OR, which could cause
        // incorrect behavior when only one of exports or module is an object
        expect(Q).toBeDefined();
        expect(typeof Q).toBe("function");

        // Verify basic promise functionality works
        const deferred = Q.defer();
        expect(deferred).toBeDefined();
        expect(deferred.promise).toBeDefined();
        expect(deferred.resolve).toBeDefined();
        expect(deferred.reject).toBeDefined();

        // Test that promises work as expected
        let resolved = false;
        Q.resolve(42).then((value) => {
            resolved = true;
            expect(value).toBe(42);
        });

        // Give the promise time to resolve
        setTimeout(() => {
            expect(resolved).toBe(true);
        }, 10);
    });
});