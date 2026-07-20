import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should track unhandled rejections', () => {
        const promise = Q.defer().promise;
        Q.resetUnhandledRejections();
        Q.stopUnhandledRejectionTracking();
        trackRejection(promise, new Error('Test error'));
        expect(Q.getUnhandledReasons()).toEqual([]);
        Q.stopUnhandledRejectionTracking();
        Q.resetUnhandledRejections();
        trackRejection(promise, new Error('Test error'));
        expect(Q.getUnhandledReasons()).toEqual(['Error: Test error']);
    });
});