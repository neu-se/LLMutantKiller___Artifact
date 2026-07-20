import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle rejectionHandled event correctly', () => {
        const spy = jest.fn();
        process.emit = spy;
        Q.reject(new Error()).then(null, () => {});
        Q.nextTick(() => {
            expect(spy).toHaveBeenCalledTimes(2);
            expect(spy).toHaveBeenNthCalledWith(1, 'unhandledRejection', expect.any(Error), expect.any(Object));
            expect(spy).toHaveBeenNthCalledWith(2, 'rejectionHandled', expect.any(Error), expect.any(Object));
        });
    });
});