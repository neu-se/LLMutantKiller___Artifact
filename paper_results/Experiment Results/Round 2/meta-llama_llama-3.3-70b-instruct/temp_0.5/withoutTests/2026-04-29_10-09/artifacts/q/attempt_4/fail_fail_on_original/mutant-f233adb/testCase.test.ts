import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should create a promise when given a value', () => {
        const promise = Q(1);
        expect(typeof promise.then).toBe('function');
    });
});