import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise inspection', () => {
    it('should inspect a promise and return its state', () => {
        const promise = Q(5);
        const snapshot = promise.inspect();
        if ((snapshot as any).state === "fulfilled") {
            expect((snapshot as any).value).toBe(5);
        } else {
            expect(true).toBe(false);
        }
    });

    it('should inspect a rejected promise and return its state', () => {
        const error = new Error('Test error');
        const promise = Q.reject(error);
        const snapshot = promise.inspect();
        if ((snapshot as any).state === "rejected") {
            expect((snapshot as any).reason).toBe(error);
        } else {
            expect(true).toBe(false);
        }
    });

    it('should inspect a pending promise and return its state', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const snapshot = promise.inspect();
        if ((snapshot as any).state === "pending") {
            expect(true).toBe(true);
        } else {
            expect(true).toBe(false);
        }
        deferred.resolve(5);
    });
});