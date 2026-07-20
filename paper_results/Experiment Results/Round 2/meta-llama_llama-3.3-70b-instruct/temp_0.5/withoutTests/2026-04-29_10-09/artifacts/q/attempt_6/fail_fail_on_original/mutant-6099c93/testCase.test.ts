import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle rejectionHandled event correctly', () => {
        const spy = jest.fn();
        process.emit = spy;
        const promise = Q.reject(new Error());
        promise.then(null, () => {});
        Q.nextTick(() => {
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
});