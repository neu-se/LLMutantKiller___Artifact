import { Q } from "../../../q.js";

describe('Q', () => {
    it('should call process.emit with the correct arguments when untracking a rejection', () => {
        const originalEmit = process.emit;
        let emitCalled = false;
        process.emit = (event: string, ...args: any[]) => {
            emitCalled = true;
            if (event === 'rejectionHandled') {
                expect(args.length).toBe(2);
            }
        };

        const promise = Q.reject('Test rejection');
        Q.untrackRejection(promise);

        expect(emitCalled).toBe(true);

        process.emit = originalEmit;
    });
});