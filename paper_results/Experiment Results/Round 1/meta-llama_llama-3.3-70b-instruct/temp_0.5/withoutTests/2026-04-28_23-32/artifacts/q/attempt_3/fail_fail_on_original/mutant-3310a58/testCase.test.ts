import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not enable long stack support when process is not an object', () => {
        // Save the original process object
        const originalProcess = process;

        // Set process to a non-object value
        process = null;

        // Check if longStackSupport is false
        const q = Q;
        expect(q.longStackSupport).toBe(false);

        // Restore the original process object
        process = originalProcess;
    });
});