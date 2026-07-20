import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.longStackSupport stack capture in defer", () => {
    it("should capture stack trace on deferred promise when longStackSupport is enabled", async () => {
        // Enable long stack support
        Q.longStackSupport = true;

        // Create a deferred promise - the mutation affects the block that
        // sets promise.stack and promise.stackCounter when longStackSupport is true
        const deferred = Q.defer();

        // In the original code, when Q.longStackSupport is true and hasStacks is true,
        // the deferred promise gets a .stack property set
        // In the mutated code, `if (false)` means this block never runs
        expect(deferred.promise.stack).toBeDefined();
        expect(typeof deferred.promise.stack).toBe("string");
        expect(deferred.promise.stack.length).toBeGreaterThan(0);

        // Clean up
        Q.longStackSupport = false;
        deferred.resolve(undefined);
    });
});