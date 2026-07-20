import { Q } from "../../../q.js";

describe('Q', () => {
    it('should handle process.domain correctly', () => {
        const originalProcess = global.process;
        global.process = { toString: () => '[object process]' };
        expect(() => {
            const promise = Q.resolve();
            promise.done(null, null, null);
        }).not.toThrow();
        global.process = originalProcess;
    });
});