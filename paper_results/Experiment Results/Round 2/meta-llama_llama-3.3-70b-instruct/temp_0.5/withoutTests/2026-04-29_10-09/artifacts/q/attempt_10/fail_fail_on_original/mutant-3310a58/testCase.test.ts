import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not enable long stack support by default', () => {
        const originalProcess = global.process;
        global.process = {} as any;
        expect(Q.longStackSupport).toBe(false);
        global.process = originalProcess;
    });
});