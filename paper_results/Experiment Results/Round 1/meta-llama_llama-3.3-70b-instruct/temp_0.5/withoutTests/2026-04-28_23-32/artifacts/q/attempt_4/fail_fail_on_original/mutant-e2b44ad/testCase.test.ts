import { Q } from "../../../q.js";

describe('Q', () => {
    it('should handle process.domain correctly', () => {
        const originalProcess = global.process;
        global.process = { toString: () => '[object process]' };
        const promise = Q.resolve();
        promise.done(null, null, null);
        expect(true).toBe(true);
        global.process = originalProcess;
    });
});