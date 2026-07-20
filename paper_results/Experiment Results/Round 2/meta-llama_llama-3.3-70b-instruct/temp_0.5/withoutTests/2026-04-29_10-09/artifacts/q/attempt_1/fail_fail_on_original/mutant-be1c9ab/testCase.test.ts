import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should correctly identify StopIteration exceptions', () => {
        class StopIteration {}
        const exception = new StopIteration();
        exception.toString = function() { return "[object StopIteration]"; };
        expect(Q.isStopIteration(exception)).toBe(true);
    });
});