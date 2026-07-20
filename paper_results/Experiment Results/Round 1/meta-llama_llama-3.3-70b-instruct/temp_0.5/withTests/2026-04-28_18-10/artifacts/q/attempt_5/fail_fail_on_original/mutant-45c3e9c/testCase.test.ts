describe('q', () => {
    it('should test the behavior of the mutated file', () => {
        const task = jest.fn();
        const nextTickSpy = jest.spyOn(Q, 'nextTick');
        Q.nextTick(task);
        Q.nextTick.runAfter(task);
        expect(nextTickSpy).toHaveBeenCalledTimes(2);
        nextTickSpy.mockRestore();
    });
});