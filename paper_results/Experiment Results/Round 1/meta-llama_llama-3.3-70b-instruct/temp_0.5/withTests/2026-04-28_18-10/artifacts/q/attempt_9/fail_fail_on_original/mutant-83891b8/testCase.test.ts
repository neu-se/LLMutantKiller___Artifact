import { Q } from '../../q';

describe('nearer function', () => {
    it('should return the value of a fulfilled promise', () => {
        const promise = Q(5);
        const inspected = promise.inspect();
        if (inspected.state === "fulfilled") {
            expect(Q.nearer(promise)).toBe(inspected.value);
        } else {
            expect(true).toBe(false);
        }
    });

    it('should return the original value if the promise is not fulfilled', () => {
        const promise = Q.defer().promise;
        expect(Q.nearer(promise)).toBe(promise);
    });

    it('should not return the value of a rejected promise', () => {
        const promise = Q.reject(5);
        const inspected = promise.inspect();
        if (inspected.state === "fulfilled") {
            expect(true).toBe(false);
        } else {
            expect(Q.nearer(promise)).not.toBe(inspected.reason);
        }
    });
});