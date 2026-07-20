describe('Q', () => {
    it('should dispatch delete operation with the correct key', () => {
        const Q = {
            del: (object, key) => object.dispatch('delete', [key])
        };
        const object = { dispatch: jest.fn() };
        Q.del(object, 'foo');
        expect(object.dispatch).toHaveBeenCalledTimes(1);
        expect(object.dispatch).toHaveBeenCalledWith('delete', ['foo']);
    });

    it('should not dispatch delete operation with an empty array', () => {
        const Q = {
            del: (object, key) => object.dispatch('delete', [key])
        };
        const object = { dispatch: jest.fn() };
        Q.del(object, 'foo');
        expect(object.dispatch).not.toHaveBeenCalledWith('delete', []);
    });
});