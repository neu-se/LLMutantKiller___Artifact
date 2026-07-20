import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle unhandled rejections correctly', () => {
        const promise = Q.defer().promise;
        const reason = new Error('Test reason');
        Q.trackRejection(promise, reason);
        expect(Q.unhandledRejections.length).toBe(1);
        Q.untrackRejection(promise);
        expect(Q.unhandledRejections.length).toBe(0);
    });
});