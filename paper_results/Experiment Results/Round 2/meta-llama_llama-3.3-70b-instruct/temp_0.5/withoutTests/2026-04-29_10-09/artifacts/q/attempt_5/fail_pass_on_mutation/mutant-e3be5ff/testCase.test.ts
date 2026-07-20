import * as q from "../../../../../../../../../../../subject_repositories/q/q.js"

describe('Q', () => {
    it('should reset unhandled rejections when trackUnhandledRejections is false', () => {
        q.stopUnhandledRejectionTracking();
        q.resetUnhandledRejections();
        expect(q.getUnhandledReasons()).toEqual([]);
        q.stopUnhandledRejectionTracking();
        q.trackUnhandledRejections = true;
        q.resetUnhandledRejections();
        expect(q.getUnhandledReasons()).toEqual([]);
    });
});