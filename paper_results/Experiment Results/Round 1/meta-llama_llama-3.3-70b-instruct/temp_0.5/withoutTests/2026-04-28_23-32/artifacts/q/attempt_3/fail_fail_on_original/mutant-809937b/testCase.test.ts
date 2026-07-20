import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should correctly handle unhandled rejections', () => {
        const promise = Q.reject('Test rejection');
        const originalEmit = process.emit;
        let emitted = false;
        process.emit = (...args: any[]) => {
            if (args[0] === 'unhandledRejection') {
                emitted = true;
            }
            return originalEmit(...args);
        };
        Q.untrackRejection(promise);
        expect(emitted).toBe(true);
        process.emit = originalEmit;
    });
});