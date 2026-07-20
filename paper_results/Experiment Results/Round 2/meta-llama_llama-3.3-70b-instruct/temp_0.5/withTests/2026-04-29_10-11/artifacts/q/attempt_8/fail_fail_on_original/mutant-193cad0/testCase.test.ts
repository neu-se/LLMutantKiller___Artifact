import { Q } from '../../../../../../../../../../../subject_repositories/q/q.js';

describe("Q.any", () => {
    it("should reject with a meaningful error message when all promises are rejected", () => {
        const deferred1 = Q.defer();
        const deferred2 = Q.defer();
        const promises = [deferred1.promise, deferred2.promise];

        const promise = Q.any(promises);

        deferred1.reject("Error 1");
        deferred2.reject("Error 2");

        return promise.then(
            () => expect(true).toBe(false),
            (error: any) => {
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toBe("Q can't get fulfillment value from any promise, all promises were rejected. Last error message: Error 2");
            }
        );
    });
});