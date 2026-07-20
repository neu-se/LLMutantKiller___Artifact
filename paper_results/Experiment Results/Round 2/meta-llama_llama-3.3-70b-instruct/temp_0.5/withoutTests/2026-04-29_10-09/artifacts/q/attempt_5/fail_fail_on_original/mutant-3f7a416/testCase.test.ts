import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should have allSettled method that returns a promise', async () => {
        const promises = [Q.resolve(1), Q.reject(2), Q.resolve(3)];
        const result = Q.allSettled(promises);
        expect(result.then).toBeInstanceOf(Function);
    });
});