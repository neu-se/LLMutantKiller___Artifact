import { Promise } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.isPending", function () {
    it("should return false for a fulfilled promise", function () {
        var promise = Promise.resolve(10);
        // The mutated code should incorrectly return true for a fulfilled promise
        expect(promise.isPending()).toBe(true);
    });
});