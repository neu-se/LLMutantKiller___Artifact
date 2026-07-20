import Q from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should reset unhandled rejections tracking correctly', () => {
        Q.stopUnhandledRejectionTracking();
        Q.resetUnhandledRejections();
        Q.reject("test");
        Q.resetUnhandledRejections();
        Q.stopUnhandledRejectionTracking();
        Q.reject("test");
        Q.resetUnhandledRejections();
        expect(Q.getUnhandledReasons()).toEqual([]);
        Q.startUnhandledRejectionTracking();
        Q.reject("test");
        expect(Q.getUnhandledReasons()).not.toEqual([]);
    });
});