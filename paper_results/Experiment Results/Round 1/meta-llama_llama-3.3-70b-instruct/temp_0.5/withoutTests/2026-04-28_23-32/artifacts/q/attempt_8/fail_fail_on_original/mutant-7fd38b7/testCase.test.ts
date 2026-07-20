import Q from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should reset unhandled rejections tracking correctly', () => {
        Q.stopUnhandledRejectionTracking();
        Q.resetUnhandledRejections();
        Q.reject("test");
        Q.resetUnhandledRejections();
        Q.stopUnhandledRejectionTracking();
        Q.resetUnhandledRejections();
        Q.reject("test");
        expect(Q.getUnhandledReasons()).toEqual([]);
        Q.stopUnhandledRejectionTracking();
        expect(Q.getUnhandledReasons()).toEqual([]);
    });
});