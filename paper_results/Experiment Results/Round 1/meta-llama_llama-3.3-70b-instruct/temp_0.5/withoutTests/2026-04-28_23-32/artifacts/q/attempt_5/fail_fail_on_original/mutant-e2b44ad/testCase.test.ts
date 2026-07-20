import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle process.domain correctly', () => {
        const originalProcess = global.process;
        global.process = {};
        const promise = Q.resolve();
        expect(() => promise.done(null, null, null)).not.toThrow();
        global.process = originalProcess;
    });
});