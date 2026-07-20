import { Q } from "../q.js";

describe("Q.isPending", () => {
    it("should return true for a pending promise", () => {
        const deferred = Q.defer();
        expect(Q.isPending(deferred.promise)).toBe(true);
    });
});