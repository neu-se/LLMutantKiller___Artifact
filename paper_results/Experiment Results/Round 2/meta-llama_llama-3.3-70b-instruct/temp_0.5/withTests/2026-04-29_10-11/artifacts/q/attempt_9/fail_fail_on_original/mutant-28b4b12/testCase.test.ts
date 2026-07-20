describe('Q', () => {
    it('should pass the arguments to the post method', () => {
        const obj = {
            method: () => {},
        };

        const promise = Q(obj);
        const dispatchSpy = jest.spyOn(promise, 'dispatch');
        promise.post('method', ['arg1', 'arg2']);
        expect(dispatchSpy).toHaveBeenCalledTimes(1);
        expect(dispatchSpy).toHaveBeenCalledWith('post', ['method', ['arg1', 'arg2']]);

        dispatchSpy.mockRestore();
    });
});