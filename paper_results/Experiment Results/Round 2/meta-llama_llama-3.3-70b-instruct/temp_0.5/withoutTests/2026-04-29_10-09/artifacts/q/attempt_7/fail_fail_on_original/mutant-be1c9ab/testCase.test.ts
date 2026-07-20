describe('Q', () => {
    it('should correctly identify StopIteration exceptions', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q');
        class StopIteration {}
        const exception = new StopIteration();
        exception.toString = function() { return "[object StopIteration]"; };
        expect(Q.isStopIteration(exception)).toBe(true);

        class QReturnValue {}
        const exception2 = new QReturnValue();
        exception2.toString = function() { return "[object StopIteration]"; };
        expect(Q.isStopIteration(exception2)).toBe(true);
    });
});