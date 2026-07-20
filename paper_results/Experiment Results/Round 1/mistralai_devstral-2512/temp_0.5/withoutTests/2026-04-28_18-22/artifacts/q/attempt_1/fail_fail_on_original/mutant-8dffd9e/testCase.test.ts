import { Q } from "./q.js";

describe("Q.isPending mutation test", () => {
    it("should correctly identify pending promises", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;

        // The promise should be pending initially
        expect(Q.isPending(promise)).toBe(true);

        // After resolving, it should no longer be pending
        deferred.resolve("resolved");
        return Q.when(promise, () => {
            expect(Q.isPending(promise)).toBe(false);
        });
    });
});