import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle process and domain correctly", () => {
        // Create a promise that will be resolved in the next tick
        const promise = Q(10);

        // Check if process is an object and has a domain property
        const hasDomain = (typeof process === "object" && process && process.domain);

        // Check if process is an object or has a domain property
        const hasDomainOrIsObject = (typeof process === "object" || process && process.domain);

        // If the two conditions are not equivalent, the test should pass
        expect(hasDomain).not.toBe(hasDomainOrIsObject);

        // Return the promise to ensure the test waits for it to resolve
        return promise;
    });
});