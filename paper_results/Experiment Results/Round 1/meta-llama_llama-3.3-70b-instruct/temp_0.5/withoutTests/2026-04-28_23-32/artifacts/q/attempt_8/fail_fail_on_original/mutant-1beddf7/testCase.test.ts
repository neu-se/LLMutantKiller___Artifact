import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should resolve when the resolver does not throw an error', async () => {
        const resolver = () => { };
        const promise = Q.promise(resolver);
        await expect(promise).resolves.not.toThrow();
    });
});