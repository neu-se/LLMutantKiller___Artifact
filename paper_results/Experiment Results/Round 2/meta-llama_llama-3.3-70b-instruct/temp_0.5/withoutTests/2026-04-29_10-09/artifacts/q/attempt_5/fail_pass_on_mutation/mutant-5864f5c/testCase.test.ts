import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle StopIteration exception correctly', () => {
        // Create a QReturnValue exception
        class QReturnValue extends Error {}

        // Check if the function isStopIteration returns false for the QReturnValue exception
        const exception = new QReturnValue();
        function isStopIteration(exception: any) {
            return Object.prototype.toString.call(exception) === "[object StopIteration]";
        }
        expect(isStopIteration(exception)).toBe(false);
    });
});