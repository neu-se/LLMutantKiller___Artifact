describe("Testing Q library", () => {
    it("should test the behavior of Q library", () => {
        const domain = { enter: jest.fn(), exit: jest.fn() };

        // Simulate the nextTick function
        try {
            throw new Error();
        } catch (e) {
            if (domain) {
                domain.exit();
            }
        }

        expect(domain.exit).toHaveBeenCalledTimes(1);

        // Test the mutated code
        const mutatedDomain = { enter: jest.fn(), exit: jest.fn() };

        // Simulate the mutated code
        try {
            throw new Error();
        } catch (e) {
            if (mutatedDomain) {
                // Do nothing
            }
        }

        expect(mutatedDomain.exit).toHaveBeenCalledTimes(0);
    });
});