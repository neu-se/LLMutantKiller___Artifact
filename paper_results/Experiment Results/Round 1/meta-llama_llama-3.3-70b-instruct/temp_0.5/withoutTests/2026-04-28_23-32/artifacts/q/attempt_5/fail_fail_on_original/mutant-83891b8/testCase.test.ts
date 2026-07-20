import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return the fulfillment value of a promise when its state is fulfilled', () => {
        const promise = Q.resolve('fulfilled value');
        const nearerValue = Q.nearer(promise);
        expect(nearerValue).toBe('fulfilled value');
    });
});