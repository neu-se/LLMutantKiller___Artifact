import * as q from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should track unhandled rejections', () => {
        const originalTrackUnhandledRejections = q.trackUnhandledRejections;
        q.trackUnhandledRejections = true;
        const promise = q.reject('Test rejection');
        q.trackUnhandledRejections = originalTrackUnhandledRejections;
        expect(q.getUnhandledReasons().length).toBe(1);
    });
});