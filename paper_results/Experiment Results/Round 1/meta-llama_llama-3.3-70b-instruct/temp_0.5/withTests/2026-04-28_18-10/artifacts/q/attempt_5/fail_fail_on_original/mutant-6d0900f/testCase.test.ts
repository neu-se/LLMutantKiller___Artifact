import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should handle unhandled rejections correctly', () => {
        Q.trackUnhandledRejections = true;
        const promise = Q.reject(new Error('Test error'));
        Q.untrackRejection(promise);
        expect(Q.unhandledRejections).not.toContain(promise);
    });
});