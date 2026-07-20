import * as q from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should track unhandled rejections', () => {
        const promise = q.reject('Test rejection');
        expect(q.getUnhandledReasons().length).toBe(1);
        if (q.trackUnhandledRejections) {
            q.untrackRejection(promise);
        }
        expect(q.getUnhandledReasons().length).toBe(0);
    });
});