describe('Q', () => {
    it('should test the behavior of the mutated file', () => {
        const nextTick = jest.fn();
        const runAfter = jest.fn();
        const Q = {
            nextTick,
            nextTick: {
                runAfter
            }
        };
        Q.nextTick();
        Q.nextTick.runAfter();
        expect(nextTick).toHaveBeenCalledTimes(1);
        expect(runAfter).toHaveBeenCalledTimes(1);
    });
});