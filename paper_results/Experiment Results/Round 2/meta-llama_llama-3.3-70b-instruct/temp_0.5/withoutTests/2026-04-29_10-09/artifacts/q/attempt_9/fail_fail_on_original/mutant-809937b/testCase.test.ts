import { Q } from "../../../q.js";

describe('Q', () => {
    it('should check the process.emit condition', () => {
        const originalEmit = process.emit;
        let emitCalled = false;
        process.emit = () => {
            emitCalled = true;
        };

        const promise = Q.reject('Test rejection');
        if (typeof process === "object" && typeof process.emit === "function") {
            Q.untrackRejection(promise);
        } else {
            throw new Error('Process is not an object or does not have an emit function');
        }

        expect(emitCalled).toBe(true);

        process.emit = originalEmit;
    });
});