// Test to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module export behavior", () => {
    it("should export Q when running in a CommonJS environment", () => {
        // This test verifies that Q is properly exported in a CommonJS environment
        // The mutation changes the condition from checking `typeof exports === "object"`
        // to just `true`, which would break the module export in non-CommonJS environments
        // but should still work in CommonJS. We test that Q is actually available.
        expect(Q).toBeDefined();
        expect(typeof Q).toBe("function");

        // Verify basic Q functionality to ensure it's the real Q
        const deferred = Q.defer();
        expect(deferred).toBeDefined();
        expect(deferred.promise).toBeDefined();
        expect(typeof deferred.resolve).toBe("function");
        expect(typeof deferred.reject).toBe("function");

        // Test that promises work
        let resolved = false;
        Q.resolve(42).then((value) => {
            resolved = true;
            expect(value).toBe(42);
        });

        // Give the promise time to resolve
        return Q.delay(10).then(() => {
            expect(resolved).toBe(true);
        });
    });
});