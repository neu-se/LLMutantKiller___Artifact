describe('dispatch function', () => {
    it('should call the dispatch method of the object', () => {
        const object = {
            dispatch: jest.fn(),
        };

        const dispatch = function(object, op, args) {
            return object.dispatch(op, args);
        };

        const result = dispatch(object, 'op', ['arg1', 'arg2']);

        expect(object.dispatch).toHaveBeenCalledTimes(1);
        expect(object.dispatch).toHaveBeenCalledWith('op', ['arg1', 'arg2']);
        expect(result).toBeUndefined();
    });
});