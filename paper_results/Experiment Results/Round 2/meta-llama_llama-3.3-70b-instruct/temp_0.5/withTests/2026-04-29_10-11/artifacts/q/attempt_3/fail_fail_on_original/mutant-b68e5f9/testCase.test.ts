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

    it('should return undefined when a callback is provided', () => {
        const promise = Q(10);
        const result = promise.nodeify(() => {});
        expect(result).toBeUndefined();
    });
});