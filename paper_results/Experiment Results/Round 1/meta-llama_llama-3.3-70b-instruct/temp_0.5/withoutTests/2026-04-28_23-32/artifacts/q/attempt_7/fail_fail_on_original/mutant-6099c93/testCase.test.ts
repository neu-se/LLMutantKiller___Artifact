import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should emit "rejectionHandled" event when a handled rejection is removed from the unhandledRejections array', () => {
        const promise = Q.reject(new Error('Test error'));
        const spy = jest.fn();
        const originalEmit = process.emit;
        process.emit = spy;
        Q.untrackRejection(promise);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('rejectionHandled', expect.any(String), promise);
        process.emit = originalEmit;
    });
});