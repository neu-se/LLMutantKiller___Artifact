import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle StopIteration exception correctly', () => {
        // Create a StopIteration exception
        class StopIteration extends Error {}

        // Check if the function isStopIteration returns true for the StopIteration exception
        function isStopIteration(exception: any) {
            return Object.prototype.toString.call(exception) === "[object StopIteration]";
        }

        // Create a QReturnValue exception
        class QReturnValue extends Error {}

        // Check if the function isStopIteration returns true for the QReturnValue exception
        const exception = new QReturnValue();
        expect(isStopIteration(exception)).toBe(false);

        // Check if the function isStopIteration returns true for the StopIteration exception
        const stopIterationException = new StopIteration();
        expect(isStopIteration(stopIterationException)).toBe(true);
    });
});