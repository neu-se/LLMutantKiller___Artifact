import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should call process.emit when untracking a rejection', () => {
        const originalEmit = process.emit;
        let emitCalled = false;
        process.emit = () => {
            emitCalled = true;
        };

        const promise = Q.reject('Test rejection');
        Q.untrackRejection(promise);

        expect(emitCalled).toBe(true);

        process.emit = originalEmit;
    });
});