import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should correctly handle unhandled rejections', () => {
        const promise = Q.reject('Test rejection');
        const originalEmit = process.emit;
        let emitted = false;
        process.emit = function(event: string, ...args: any[]) {
            if (event === 'unhandledRejection') {
                emitted = true;
            }
            // @ts-ignore
            return originalEmit.apply(process, [event, ...args]);
        };
        Q.untrackRejection(promise);
        expect(emitted).toBe(true);
        process.emit = originalEmit;
    });
});