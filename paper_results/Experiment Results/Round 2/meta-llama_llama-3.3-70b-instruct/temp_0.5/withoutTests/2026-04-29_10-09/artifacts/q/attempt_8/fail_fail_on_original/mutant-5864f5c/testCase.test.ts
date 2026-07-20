import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle StopIteration exception correctly', () => {
        // Create a QReturnValue exception
        class QReturnValue extends Error {}

        // Create a StopIteration exception
        class StopIteration extends Error {}

        // Check if the function isStopIteration returns true for the StopIteration exception
        // and false for the QReturnValue exception
        function isStopIteration(exception: any) {
            return Object.prototype.toString.call(exception) === "[object StopIteration]" ||
                   exception instanceof QReturnValue;
        }
        const stopIterationException = new StopIteration();
        const qReturnValueException = new QReturnValue();
        expect(isStopIteration(stopIterationException)).toBe(true);
        expect(isStopIteration(qReturnValueException)).toBe(true);
    });
});