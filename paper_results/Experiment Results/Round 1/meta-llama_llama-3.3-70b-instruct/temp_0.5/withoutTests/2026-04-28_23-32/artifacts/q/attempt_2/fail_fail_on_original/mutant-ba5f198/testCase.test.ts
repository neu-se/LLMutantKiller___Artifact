import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should handle setImmediate correctly', async () => {
        const originalSetImmediate = global.setImmediate;
        const originalTimeout = global.setTimeout;

        // Mock setImmediate and setTimeout to track their calls
        global.setImmediate = jest.fn();
        global.setTimeout = jest.fn();

        // Create a promise that resolves immediately
        const promise = Q.resolve();

        // Wait for the promise to resolve
        await promise;

        // Check if setImmediate is called when it's a function
        expect(global.setImmediate).toHaveBeenCalledTimes(1);

        // Restore the original setImmediate and setTimeout
        global.setImmediate = originalSetImmediate;
        global.setTimeout = originalTimeout;
    });
});