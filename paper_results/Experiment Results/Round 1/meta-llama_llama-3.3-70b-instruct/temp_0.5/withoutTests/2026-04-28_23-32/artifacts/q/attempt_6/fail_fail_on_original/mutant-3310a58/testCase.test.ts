import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should check if process is an object before checking Q_DEBUG', () => {
        // Set process to a non-object value
        const originalProcess = process;
        process = null;

        // Check if longStackSupport is false
        const q = Q;
        expect(q.longStackSupport).toBe(false);

        // Restore the original process
        process = originalProcess;
    });
});