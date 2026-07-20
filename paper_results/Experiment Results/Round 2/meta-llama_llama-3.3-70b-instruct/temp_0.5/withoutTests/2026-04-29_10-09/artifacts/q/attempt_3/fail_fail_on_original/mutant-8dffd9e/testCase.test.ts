import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.isPending", () => {
    it("should return true for a pending promise and false for a fulfilled promise", () => {
        const deferred = Q.defer();
        expect(Q.isPending(deferred.promise)).toBe(true);
        deferred.resolve();
        expect(Q.isPending(deferred.promise)).toBe(false);
    });
});