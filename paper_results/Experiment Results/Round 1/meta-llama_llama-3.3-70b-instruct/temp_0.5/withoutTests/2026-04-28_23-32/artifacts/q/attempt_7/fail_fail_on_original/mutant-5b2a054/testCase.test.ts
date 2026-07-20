import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should handle uncaught exceptions in the async queue', () => {
        const error = new Error('Test error');
        const task = () => { throw error; };

        // Simulate the next tick
        Q.nextTick(task);

        // Check if the error is thrown
        expect(() => Q.nextTick.flush()).not.toThrowError();
    });
});