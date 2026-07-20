import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle rejectionHandled event correctly', () => {
        const promise = Q.reject(new Error());
        promise.catch(() => {});
        expect(Q.getUnhandledReasons()).toHaveLength(0);
    });
});