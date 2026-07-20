import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should untrack a rejection when the promise is resolved', () => {
        const promise = Q.defer().promise;
        const reason = new Error('Test reason');
        Q.trackRejection(promise, reason);
        Q.untrackRejection(promise);
        expect(Q.unhandledRejections).not.toContain(promise);
    });
});