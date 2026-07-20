import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call process.emit when untracking a rejection', () => {
        const originalEmit = process.emit;
        let emitCalled = false;
        process.emit = (event: string, ...args: any[]) => {
            emitCalled = true;
            if (event === 'rejectionHandled') {
                expect(typeof process.emit === 'function' && typeof process === 'object').toBe(true);
            }
        };

        const promise = Q.reject('Test rejection');
        Q.untrackRejection(promise);

        expect(emitCalled).toBe(true);

        process.emit = originalEmit;
    });
});