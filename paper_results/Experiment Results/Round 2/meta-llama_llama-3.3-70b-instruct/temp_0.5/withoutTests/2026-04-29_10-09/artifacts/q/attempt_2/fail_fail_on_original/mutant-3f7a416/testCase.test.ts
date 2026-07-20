import { Q } from "./q.js";

describe('Q', () => {
    it('should have allSettled method that returns a promise for an array of states', async () => {
        const promises = [Q.resolve(1), Q.reject(2), Q.resolve(3)];
        const result = await Q.allSettled(promises);
        expect(result).toEqual([
            { state: 'fulfilled', value: 1 },
            { state: 'rejected', reason: 2 },
            { state: 'fulfilled', value: 3 },
        ]);
    });
});