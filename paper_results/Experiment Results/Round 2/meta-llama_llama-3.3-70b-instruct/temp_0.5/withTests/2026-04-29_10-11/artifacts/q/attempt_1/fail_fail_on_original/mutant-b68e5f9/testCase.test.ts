import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('promise nodeify', () => {
    it('should call the callback with the resolution value when the promise is fulfilled', () => {
        const promise = Q(10);
        let callbackCalled = false;
        promise.nodeify((err, value) => {
            expect(err).toBeNull();
            expect(value).toBe(10);
            callbackCalled = true;
        });
        expect(callbackCalled).toBe(true);
    });

    it('should call the callback with the rejection reason when the promise is rejected', () => {
        const promise = Q.reject(new Error('Test error'));
        let callbackCalled = false;
        promise.nodeify((err, value) => {
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('Test error');
            expect(value).toBeUndefined();
            callbackCalled = true;
        });
        expect(callbackCalled).toBe(true);
    });

    it('should return the promise when no callback is provided', () => {
        const promise = Q(10);
        const returnedPromise = promise.nodeify();
        expect(returnedPromise).toBe(promise);
    });
});