import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should create a promise for an immediate reference', () => {
        const promise = Q(5);
        expect(promise.inspect().state).toBe('fulfilled');
        expect(promise.inspect().value).toBe(5);
    });
});