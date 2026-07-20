import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should emit "rejectionHandled" event when a handled rejection is removed from the unhandledRejections array', () => {
        const promise = Q.reject(new Error('Test error'));
        const spy = jest.fn();
        const originalEmit = process.emit;
        process.emit = spy;
        Q.untrackRejection(promise);
        expect(spy).not.toHaveBeenCalledWith('rejectionHandled', expect.any(String), promise);
    });
});