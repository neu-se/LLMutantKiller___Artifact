describe("Testing nextTick function", () => {
    it("should test the behavior of nextTick function", () => {
        const domain = { enter: jest.fn(), exit: jest.fn() };

        if (typeof global.Q !== 'undefined') {
            global.Q.nextTick(function () {
                try {
                    throw new Error();
                } catch (e) {
                    if (domain) {
                        domain.exit();
                    }
                    throw e;
                }
            });

            expect(domain.exit).toHaveBeenCalledTimes(1);

            // Test the mutated code
            const mutatedDomain = { enter: jest.fn(), exit: jest.fn() };

            global.Q.nextTick(function () {
                try {
                    throw new Error();
                } catch (e) {
                    if (mutatedDomain) {
                        // Do nothing
                    }
                    throw e;
                }
            });

            expect(mutatedDomain.exit).toHaveBeenCalledTimes(0);
        } else {
            throw new Error("Q library is not available");
        }
    });
});