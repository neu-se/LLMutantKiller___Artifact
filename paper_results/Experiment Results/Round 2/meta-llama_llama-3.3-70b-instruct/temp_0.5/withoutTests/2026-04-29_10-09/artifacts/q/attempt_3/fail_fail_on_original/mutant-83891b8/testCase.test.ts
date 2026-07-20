import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return the fulfillment value of a promise when using Q.nearer', () => {
        const promise = Q.resolve(5);
        const nearerValue = Q.nearer(promise);
        expect(nearerValue).toBe(5);
    });
});