import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle rejectionHandled event correctly', () => {
        const promise = Q.defer().promise;
        const spy = jest.fn();
        process.emit = spy;
        promise.then(null, () => {
            throw new Error();
        });
        Q.nextTick.runAfter(() => {
            Q.untrackRejection(promise);
        });
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('rejectionHandled', expect.any(Error), promise);
    });
});