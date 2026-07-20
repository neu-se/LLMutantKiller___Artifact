import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should have allSettled method that returns a promise for an array of states', async () => {
        const promises = [Q.resolve(1), Q.reject(2), Q.resolve(3)];
        expect(Q.allSettled).toBeInstanceOf(Function);
        const result = await Q.allSettled(promises);
        expect(result).toBeInstanceOf(Array);
    });
});