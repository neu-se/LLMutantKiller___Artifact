import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should reject with the reason when the resolver throws an error', async () => {
        const resolver = () => { throw new Error(); };
        const promise = Q.promise(resolver);
        await expect(promise).rejects.toThrow();
    });
});