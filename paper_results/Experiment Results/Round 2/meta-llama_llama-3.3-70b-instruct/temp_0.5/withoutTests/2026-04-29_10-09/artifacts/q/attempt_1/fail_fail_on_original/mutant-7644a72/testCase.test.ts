import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should create a promise with Q', () => {
        const promise = Q(10);
        expect(promise.inspect().state).toBe('fulfilled');
        expect(promise.inspect().value).toBe(10);
    });
});