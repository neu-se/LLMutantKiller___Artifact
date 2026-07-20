import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not enable long stack support when Q_DEBUG is not set', () => {
        const originalProcess = global.process;
        global.process = { env: {} };
        expect(Q.longStackSupport).toBe(false);
        global.process = originalProcess;
    });
});