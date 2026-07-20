import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should handle uncaught exceptions in the async queue', () => {
        const error = new Error('Test error');
        const task = () => { throw error; };
        const nextTick = Q.nextTick;

        nextTick(task);

        // Simulate the next tick
        nextTick.flush();

        // Check if the error is thrown
        expect(() => {
            // Simulate the next tick again to trigger the error
            nextTick.flush();
        }).toThrowError(error);
    });
});