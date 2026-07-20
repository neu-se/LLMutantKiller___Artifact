describe('Q', () => {
    it('should test the behavior of the mutated file', () => {
        const nextTick = jest.fn();
        const runAfter = jest.fn();
        const Q = {
            nextTick,
            nextTick: {
                runAfter: runAfter
            }
        };
        Q.nextTick.runAfter();
        expect(nextTick).toHaveBeenCalledTimes(1);
    });
});