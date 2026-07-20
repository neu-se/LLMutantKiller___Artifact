import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should enable long stack support when process is an object and Q_DEBUG is set', () => {
        const originalProcess = global.process;
        global.process = {
            env: { Q_DEBUG: 'true' },
            nextTick: () => {},
            domain: {}
        };
        expect(Q.longStackSupport).toBe(true);
        global.process = originalProcess;
    });
});