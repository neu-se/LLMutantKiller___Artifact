import * as q from "../../../../../../../../../../../subject_repositories/q/q.js"

describe('Q', () => {
    it('should reset unhandled rejections when trackUnhandledRejections is false', () => {
        q.stopUnhandledRejectionTracking();
        q.trackUnhandledRejections = false;
        q.resetUnhandledRejections();
        expect(q.unhandledReasons.length).toBe(0);
        expect(q.unhandledRejections.length).toBe(0);
        expect(q.reportedUnhandledRejections.length).toBe(0);
    });
});