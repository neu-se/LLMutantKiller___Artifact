import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should inspect pending promise', () => {
        const promise = Q.defer().promise;
        expect(promise.inspect().state).toBe('pending');
    });
});