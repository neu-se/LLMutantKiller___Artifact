describe('promise nodeify', () => {
    it('should return undefined when no callback is provided in the mutated code', () => {
        const Q = require('../../../../q');
        const promise = Q(10);
        const result = promise.nodeify();
        expect(result).toBeUndefined();
    });
});