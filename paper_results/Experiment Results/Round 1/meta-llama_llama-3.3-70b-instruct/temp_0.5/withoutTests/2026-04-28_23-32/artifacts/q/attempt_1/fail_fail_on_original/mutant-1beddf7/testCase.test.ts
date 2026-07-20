import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should reject with the reason when the resolver throws an error', () => {
        const resolver = () => { throw new Error('Test error'); };
        const promise = Q.promise(resolver);
        expect(promise).rejects.toThrowError('Test error');
    });
});