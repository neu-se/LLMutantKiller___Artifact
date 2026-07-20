describe('Q', () => {
    it('should test the behavior of the mutated file', () => {
        const Q = {
            nextTick: jest.fn(),
            nextTick: {
                runAfter: jest.fn(() => {
                    Q.nextTick();
                })
            }
        };
        Q.nextTick.runAfter();
        expect(Q.nextTick).toHaveBeenCalledTimes(1);
    });
});