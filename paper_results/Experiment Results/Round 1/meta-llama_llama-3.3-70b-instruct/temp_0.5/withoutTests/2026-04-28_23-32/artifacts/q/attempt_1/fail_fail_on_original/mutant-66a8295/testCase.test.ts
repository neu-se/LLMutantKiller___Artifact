import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should track unhandled rejections', () => {
        const promise = Q.reject('Test rejection');
        const originalUnhandledRejections = Q.getUnhandledReasons();
        Q.resetUnhandledRejections();
        promise.catch(() => {});
        const newUnhandledRejections = Q.getUnhandledReasons();
        expect(newUnhandledRejections.length).toBeLessThan(originalUnhandledRejections.length);
    });
});