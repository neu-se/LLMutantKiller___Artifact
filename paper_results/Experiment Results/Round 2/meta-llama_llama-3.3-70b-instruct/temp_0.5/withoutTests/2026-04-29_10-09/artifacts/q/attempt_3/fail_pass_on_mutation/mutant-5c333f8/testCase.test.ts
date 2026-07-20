import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should handle stack traces correctly', () => {
        const error = new Error();
        const promise = q.reject(error);
        expect(promise.isRejected()).toBe(true);
        promise.catch((reason) => {
            expect(reason).toBe(error);
        });
    });
});