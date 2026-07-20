import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should correctly identify StopIteration exceptions', () => {
        class StopIteration {}
        const exception = new StopIteration();
        exception.toString = function() { return "[object StopIteration]"; };
        expect(Q.isStopIteration(exception)).toBe(true);

        // Test the mutated code behavior
        const QReturnValue = function(value) { this.value = value; };
        const exception2 = new QReturnValue("test");
        exception2.toString = function() { return "[object StopIteration]"; };
        expect(Q.isStopIteration(exception2)).toBe(false);
    });
});