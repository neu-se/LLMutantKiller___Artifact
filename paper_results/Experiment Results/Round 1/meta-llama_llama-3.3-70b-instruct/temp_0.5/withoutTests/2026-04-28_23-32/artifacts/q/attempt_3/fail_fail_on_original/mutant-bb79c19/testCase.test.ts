import { Q } from './q.js';

describe('Q', () => {
    it('should return the fulfillment value of a promise', () => {
        const promise = Q.resolve(10);
        const inspected = promise.inspect();
        if (inspected.state === "fulfilled") {
            expect(Q.nearer(promise)).toBe(inspected.value);
        } else {
            expect(Q.nearer(promise)).toBe(promise);
        }
    });
});