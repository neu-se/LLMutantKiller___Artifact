import * as q from "../../../../../../../../../../../subject_repositories/q/q.js"

describe('Q', () => {
    it('should reset unhandled rejections when trackUnhandledRejections is false', () => {
        q.stopUnhandledRejectionTracking();
        q.trackUnhandledRejections = false;
        q.resetUnhandledRejections();
        expect(q.trackUnhandledRejections).toBe(false);
    });
});