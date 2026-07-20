import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle StopIteration exception correctly', () => {
        // Create a StopIteration exception
        class StopIteration extends Error {}
        const exception = new StopIteration();

        // Check if the function isStopIteration returns true for the StopIteration exception
        function isStopIteration(exception: any) {
            return Object.prototype.toString.call(exception) === "[object StopIteration]";
        }

        expect(isStopIteration(exception)).toBe(true);
    });
});