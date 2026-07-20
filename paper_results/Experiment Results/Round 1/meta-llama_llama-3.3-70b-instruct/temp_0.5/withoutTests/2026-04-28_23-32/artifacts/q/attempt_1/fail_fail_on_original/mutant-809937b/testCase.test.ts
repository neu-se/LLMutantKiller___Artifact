import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should correctly handle unhandled rejections', () => {
        const promise = Q.reject('Test rejection');
        const originalHandler = process.emit;
        process.emit = jest.fn();
        Q.untrackRejection(promise);
        expect(process.emit).toHaveBeenCalledTimes(1);
        expect(process.emit).toHaveBeenCalledWith('rejectionHandled', 'Test rejection', promise);
        process.emit = originalHandler;
    });
});