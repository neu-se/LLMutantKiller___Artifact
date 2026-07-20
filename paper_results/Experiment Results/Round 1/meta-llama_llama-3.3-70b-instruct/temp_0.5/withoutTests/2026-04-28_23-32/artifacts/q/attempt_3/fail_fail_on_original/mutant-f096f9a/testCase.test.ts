import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.any', () => {
    it('should return a promise', () => {
        const promise = Q.any([]);
        expect(promise).toBeDefined();
    });
});