import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when executed in an unsupported environment', () => {
        // Mock the global variables to simulate an unsupported environment
        const originalWindow = global.window;
        const originalSelf = global.self;
        global.window = undefined;
        global.self = undefined;

        // The function should throw an error
        expect(() => {
            Q();
        }).toThrowError("This environment was not anticipated by Q. Please file a bug.");

        // Restore the original global variables
        global.window = originalWindow;
        global.self = originalSelf;
    });
});