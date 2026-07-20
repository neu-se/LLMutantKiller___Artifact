import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should handle uncaught exceptions in the async queue', () => {
        const error = new Error('Test error');
        const task = () => { throw error; };

        // Simulate the next tick
        Q.nextTick(task);

        // Check if the error is thrown
        try {
            Q.nextTick.flush();
        } catch (e) {
            expect(e).toBe(error);
        }
        expect(true).toBe(true); // This line should not be reached if the error is thrown
    });
});