import { Q } from "../../../q";

describe('Q', () => {
    it('should handle uncaught exceptions in the async queue', () => {
        const error = new Error('Test error');
        const task = () => { throw error; };

        // Simulate the next tick
        Q.nextTick(task);

        // Check if the error is thrown
        expect(() => {
            // Simulate the next tick again to trigger the error
            Q.nextTick(() => {});
            Q.nextTick.flush();
        }).toThrowError(error);
    });
});