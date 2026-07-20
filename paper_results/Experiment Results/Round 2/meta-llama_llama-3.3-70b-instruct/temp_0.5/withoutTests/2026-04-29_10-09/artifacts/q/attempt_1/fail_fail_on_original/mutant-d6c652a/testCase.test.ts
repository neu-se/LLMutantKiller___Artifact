import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when hasStacks is false', () => {
        // Mock the hasStacks variable to be false
        const originalHasStacks = global.hasStacks;
        global.hasStacks = false;

        // Expect the function to throw an error
        expect(() => Q()).toThrowError("This environment was not anticipated by Q. Please file a bug.");

        // Restore the original hasStacks value
        global.hasStacks = originalHasStacks;
    });
});