describe('Q.nsend', () => {
    it('should pass arguments to the method', () => {
        const object = {
            method: jest.fn(),
        };

        const name = 'method';
        const arg1 = 'arg1';
        const arg2 = 'arg2';

        const originalNsend = Q.nsend;
        Q.nsend = function(object, name, ...args) {
            object[name](...args);
        };

        Q.nsend(object, name, arg1, arg2);

        expect(object.method).toHaveBeenCalledTimes(1);
        expect(object.method).toHaveBeenCalledWith(arg1, arg2, expect.any(Function));

        // Restore the original Q.nsend
        Q.nsend = originalNsend;
    });
});