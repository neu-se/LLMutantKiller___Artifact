import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not enable long stack support when process is not an object', () => {
        const originalProcess = global.process;
        global.process = undefined;
        expect(Q.longStackSupport).toBe(false);
        global.process = originalProcess;
    });
});