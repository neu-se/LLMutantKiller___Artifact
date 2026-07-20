describe('Q', () => {
    it('should apply a function with arguments', () => {
        const object = function(arg1: number, arg2: number) {
            return arg1 + arg2;
        };

        const promise = Q(object);
        const result = promise.fapply([1, 2]);

        return result.then((value: number) => {
            expect(value).toBe(3);
        });
    });

    it('should throw an error when fapply is called with no arguments', () => {
        const object = function(arg1: number, arg2: number) {
            return arg1 + arg2;
        };

        const promise = Q(object);
        const result = promise.fapply([]);

        return expect(result).rejects.toThrow();
    });
});