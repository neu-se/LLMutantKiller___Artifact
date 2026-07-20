describe('Q', () => {
    it('should dispatch a message to an object', () => {
        const object = {
            dispatch: jest.fn(),
        };

        Q.dispatch(object, 'op', ['arg1', 'arg2']);

        expect(object.dispatch).toHaveBeenCalledTimes(1);
        expect(object.dispatch).toHaveBeenCalledWith('op', ['arg1', 'arg2']);
        expect(Q.dispatch(object, 'op', ['arg1', 'arg2'])).toBeUndefined();
    });
});