import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("spread method behavior", () => {
    it("should correctly apply fulfilled values to callback arguments", () => {
        const deferred1 = Q.defer();
        const deferred2 = Q.defer();
        const promise = Q.spread([deferred1.promise, deferred2.promise], (a: number, b: number) => {
            return a + b;
        });
        deferred1.resolve(10);
        deferred2.resolve(20);
        return promise.then((result: number) => {
            expect(result).toBe(30);
        });
    });
});