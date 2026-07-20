import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
    it("should reject when all promises are rejected", () => {
        const deferred1 = Q.defer();
        const deferred2 = Q.defer();

        const promise = Q.any([deferred1.promise, deferred2.promise]);

        deferred1.reject("Rejected 1");
        deferred2.reject("Rejected 2");

        return promise.then(() => {
            expect(true).toBe(false);
        }, (reason: any) => {
            expect(reason).toBeInstanceOf(Error);
        });
    });
});