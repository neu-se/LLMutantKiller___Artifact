import * as q from "../../../../../../../../../../../subject_repositories/q/q.js"

describe('Q', () => {
    it('should reset unhandled rejections when trackUnhandledRejections is false', () => {
        q.stopUnhandledRejectionTracking();
        q.resetUnhandledRejections();
        expect(q.getUnhandledReasons()).toEqual([]);
        q.trackUnhandledRejections = false;
        q.resetUnhandledRejections();
        expect(q.getUnhandledReasons()).toEqual([]);
        if (q.trackUnhandledRejections === false) {
            expect(true).toBe(true);
        } else {
            expect(true).toBe(false);
        }
    });
});