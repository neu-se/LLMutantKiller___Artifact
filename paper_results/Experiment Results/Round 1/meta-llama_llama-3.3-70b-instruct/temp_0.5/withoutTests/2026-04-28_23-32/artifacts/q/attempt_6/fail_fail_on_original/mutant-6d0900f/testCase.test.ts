import * as q from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should track unhandled rejections', () => {
        const promise = q.reject('Test rejection');
        q.untrackRejection = function(p) {
            if (!q.trackUnhandledRejections) {
                return;
            }
            // rest of the function implementation
        };
        q.untrackRejection(promise);
        expect(q.getUnhandledReasons().length).toBe(0);
    });
});