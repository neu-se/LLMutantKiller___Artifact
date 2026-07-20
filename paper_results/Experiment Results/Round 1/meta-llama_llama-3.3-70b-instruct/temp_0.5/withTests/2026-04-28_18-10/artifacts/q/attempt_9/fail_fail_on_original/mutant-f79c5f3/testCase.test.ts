import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.any', () => {
    it('should reject after all promises are rejected', () => {
        const deferred1 = Q.defer();
        const deferred2 = Q.defer();

        const promise = Q.any([deferred1.promise, deferred2.promise]);

        deferred1.reject('Rejected 1');
        deferred2.reject('Rejected 2');

        return promise.then((value: any) => {
            expect(true).toBe(false);
        }, (reason: any) => {
            expect(reason.message).toBe("Q can't get fulfillment value from any promise, all promises were rejected. Last error message: Rejected 2");
        });
    });
});