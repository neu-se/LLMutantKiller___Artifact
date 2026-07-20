import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return the fulfillment value of a promise when using Q.nearer', () => {
        const promise = Q(5);
        const nearerValue = Q.nearer(promise);
        expect(nearerValue).toBe(5);
    });

    it('should not return the non-fulfillment value of a promise when using Q.nearer on a non-fulfilled promise', () => {
        const promise = Q.reject(5);
        const nearerValue = Q.nearer(promise);
        expect(nearerValue).not.toBe(5);
    });
});