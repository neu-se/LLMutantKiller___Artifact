import * as q from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should track unhandled rejections', () => {
        q.stopUnhandledRejectionTracking();
        const promise = q.reject('Test rejection');
        expect(q.getUnhandledReasons().length).toBe(0);
        q.stopUnhandledRejectionTracking();
        expect(q.getUnhandledReasons().length).toBe(0);
    });
});