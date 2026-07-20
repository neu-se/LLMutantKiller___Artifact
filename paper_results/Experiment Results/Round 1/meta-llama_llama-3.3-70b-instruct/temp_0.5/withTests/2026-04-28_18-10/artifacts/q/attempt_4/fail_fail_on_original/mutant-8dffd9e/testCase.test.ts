import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isPending", () => {
    it("should return true for a pending promise and false for a non-pending promise", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        expect(Q.isPending(promise)).toBe(true);
        deferred.resolve();
        expect(Q.isPending(promise)).toBe(false);
        const pendingPromise = Q.defer().promise;
        expect(Q.isPending(pendingPromise)).toBe(false); // This line should fail on the mutated code
    });
});