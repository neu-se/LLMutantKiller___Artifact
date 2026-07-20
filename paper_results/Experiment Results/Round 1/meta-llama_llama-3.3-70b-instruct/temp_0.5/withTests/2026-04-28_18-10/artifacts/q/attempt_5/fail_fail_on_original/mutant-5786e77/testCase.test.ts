import Q from '../../q';

describe('Promise', () => {
    it('should test the behavior of spread', () => {
        const promise = Q.spread([Q(1), Q(2)], (a: number, b: number) => {
            return a + b;
        });
        return promise.then((result: number) => {
            expect(result).toBe(3);
        });
    });
});