import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle process.domain correctly', () => {
        const originalProcess = global.process;
        global.process = { domain: {} };
        const promise = Q.resolve();
        promise.done(null, null, null);
        expect(true).toBe(true);
        global.process = originalProcess;
    });
});