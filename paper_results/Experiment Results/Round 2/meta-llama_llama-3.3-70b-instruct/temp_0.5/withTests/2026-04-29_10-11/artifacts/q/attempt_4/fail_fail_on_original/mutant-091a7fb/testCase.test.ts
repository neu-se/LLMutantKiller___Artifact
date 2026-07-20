import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.any', () => {
    it('should fulfill with the first resolved promise', () => {
        const deferred1 = Q.defer();
        const deferred2 = Q.defer();
        const promises = [deferred1.promise, deferred2.promise];

        Q.nextTick(function () {
            deferred1.reject('error1');
        });

        Q.nextTick(function () {
            deferred2.resolve('value');
        }, 10);

        return Q.any(promises).then((value) => {
            expect(value).toBe('value');
        });
    });
});