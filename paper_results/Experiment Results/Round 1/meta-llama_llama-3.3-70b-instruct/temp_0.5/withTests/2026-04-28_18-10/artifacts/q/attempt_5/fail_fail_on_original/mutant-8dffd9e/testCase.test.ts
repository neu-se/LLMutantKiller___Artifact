import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isPending", () => {
    it("should return false for a pending promise", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        expect(Q.isPending(promise)).toBe(false); // This line should pass on the original code and fail on the mutated code
    });
});