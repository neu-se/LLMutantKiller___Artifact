import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should return a promise for a pending value', () => {
        const promise = Q(Promise.pending());
        expect(promise.inspect().state).toBe('pending');
    });
});