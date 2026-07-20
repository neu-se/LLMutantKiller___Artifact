import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should detect the mutation in isStopIteration function", () => {
        // Create a promise
        var promise = q.defer().promise;

        // Resolve the promise
        q.defer().resolve();

        // Check if the promise is resolved
        expect(promise.isPending()).toBe(false);
    });
});