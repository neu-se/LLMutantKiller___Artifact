import { Q } from "../../../q";

describe('Q', () => {
    it('should call process.emit with the correct arguments when untracking a rejection', () => {
        const originalEmit = process.emit;
        let emitCalled = false;
        let emitArgs: any[] = [];
        process.emit = (event: string, ...args: any[]) => {
            emitCalled = true;
            emitArgs = args;
        };

        const promise = Q.reject('Test rejection');
        Q.untrackRejection(promise);

        expect(emitCalled).toBe(true);
        expect(emitArgs.length).toBe(2);
        expect(emitArgs[0]).toBe('rejectionHandled');
        expect(emitArgs[1]).toBe(promise);

        process.emit = originalEmit;
    });
});