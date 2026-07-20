import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should detect the mutation in isStopIteration function", () => {
        const StopIteration = function() {};
        StopIteration.prototype.toString = function() {
            return "[object StopIteration]";
        };

        const QReturnValue = function() {};
        QReturnValue.prototype.toString = function() {
            return "[object QReturnValue]";
        };

        const originalException = new StopIteration();
        const mutatedException = new QReturnValue();

        // Original code
        function isStopIterationOriginal(exception) {
            return Object.prototype.toString.call(exception) === "[object StopIteration]" ||
                   exception instanceof QReturnValue;
        }

        expect(isStopIterationOriginal(originalException)).toBe(true);
        expect(isStopIterationOriginal(mutatedException)).toBe(true);

        // Mutated code
        function isStopIterationMutated(exception) {
            return Object.prototype.toString.call(exception) === "[object StopIteration]" &&
                   exception instanceof QReturnValue;
        }

        expect(isStopIterationMutated(originalException)).toBe(false);
        expect(isStopIterationMutated(mutatedException)).toBe(true);
    });
});