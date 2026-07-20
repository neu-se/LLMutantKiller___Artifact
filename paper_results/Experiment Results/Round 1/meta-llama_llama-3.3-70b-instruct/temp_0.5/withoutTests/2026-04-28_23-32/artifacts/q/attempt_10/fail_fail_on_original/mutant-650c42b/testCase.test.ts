describe('dispatch function', () => {
    it('should call the dispatch method of the object', () => {
        const object = {
            dispatch: jest.fn(),
        };

        const originalDispatch = function(object, op, args) {
            return Q(object).dispatch(op, args);
        };

        originalDispatch(object, 'op', ['arg1', 'arg2']);

        expect(object.dispatch).toHaveBeenCalledTimes(1);
        expect(object.dispatch).toHaveBeenCalledWith('op', ['arg1', 'arg2']);
    });

    it('should throw an error when dispatch method is not called', () => {
        const object = {};

        const mutatedDispatch = function(object, op, args) {
            // This is the mutated code
        };

        expect(() => mutatedDispatch(object, 'op', ['arg1', 'arg2'])).toThrowError();
    });
});