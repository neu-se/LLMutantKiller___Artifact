import Q from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should reset unhandled rejections tracking correctly', () => {
        Q.stopUnhandledRejectionTracking();
        Q.resetUnhandledRejections();
        expect(Q.getUnhandledReasons()).toEqual([]);
        Q.reject("test");
        Q.resetUnhandledRejections();
        expect(Q.getUnhandledReasons()).toEqual([]);
        Q.stopUnhandledRejectionTracking();
        Q.resetUnhandledRejections();
        expect(Q.getUnhandledReasons()).toEqual([]);
    });
});