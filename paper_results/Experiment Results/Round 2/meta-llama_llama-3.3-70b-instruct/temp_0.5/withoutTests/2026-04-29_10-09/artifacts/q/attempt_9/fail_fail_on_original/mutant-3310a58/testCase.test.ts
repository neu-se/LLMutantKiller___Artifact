import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should enable long stack support when Q_DEBUG is set and process is an object', () => {
        const originalProcess = global.process;
        global.process = {
            env: { Q_DEBUG: 'true' }
        } as any;
        expect(Q.longStackSupport).toBe(true);
        global.process = originalProcess;
    });
});