describe('Q', () => {
    it('should dispatch a message to an object', () => {
        const dispatch = (object, op, args) => {
            object.dispatch(op, args);
        };

        const object = {
            dispatch: jest.fn(),
        };

        dispatch(object, 'op', ['arg1', 'arg2']);

        expect(object.dispatch).toHaveBeenCalledTimes(1);
        expect(object.dispatch).toHaveBeenCalledWith('op', ['arg1', 'arg2']);
    });
});