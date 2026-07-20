import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should check the process.emit condition', () => {
        const originalEmit = process.emit;
        let emitCalled = false;
        process.emit = (event: string, ...args: any[]) => {
            emitCalled = true;
        };

        const promise = Q.reject('Test rejection');
        if (typeof process === "object" && typeof process.emit === "function") {
            Q.untrackRejection(promise);
        }

        expect(emitCalled).toBe(true);

        process.emit = originalEmit;
    });
});