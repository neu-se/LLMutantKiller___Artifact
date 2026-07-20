import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle unhandled rejections correctly', () => {
        const originalUntrackRejection = Q.untrackRejection;
        Q.untrackRejection = function(promise) {
            const at = Q.array_indexOf(Q.unhandledRejections, promise);
            if (at !== -1) {
                Q.unhandledRejections.splice(at, 1);
                Q.unhandledReasons.splice(at, 1);
            }
        };
        const promise = Q.reject(new Error('Test error'));
        Q.resetUnhandledRejections();
        Q.done(promise, null, null, null);
        expect(Q.getUnhandledReasons().length).toBe(0);
        Q.untrackRejection = originalUntrackRejection;
    });
});