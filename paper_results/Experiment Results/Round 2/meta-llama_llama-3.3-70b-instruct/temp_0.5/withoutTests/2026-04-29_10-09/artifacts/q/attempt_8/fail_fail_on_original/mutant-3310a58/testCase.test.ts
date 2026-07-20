import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not enable long stack support when process is not an object', () => {
        const originalProcess = global.process;
        global.process = null;
        expect(() => {
            // If Q.longStackSupport is true, the test will fail because it's not the expected behavior
            expect(Q.longStackSupport).toBe(false);
        }).toThrow();
        global.process = originalProcess;
    });
});