import { Q } from "./q";

describe('Q', () => {
    it('should return the fulfillment value of a promise when using Q.nearer', () => {
        const promise = Q(5);
        const inspected = promise.inspect();
        if (inspected.state === "fulfilled") {
            expect(Q.nearer(promise)).toBe(inspected.value);
        }
    });

    it('should not return the fulfillment value of a rejected promise when using Q.nearer', () => {
        const promise = Q.reject(5);
        expect(Q.nearer(promise)).not.toBe(5);
    });
});