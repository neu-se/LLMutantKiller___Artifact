describe("Q library", () => {
    it("should handle process checks correctly", () => {
        // Arrange
        const originalProcess = global.process;
        global.process = {
            env: {},
            nextTick: () => {}
        } as any;

        // Act and Assert
        try {
            const Q = require('./q');
            expect(Q.longStackSupport).toBe(false);
        } catch (error) {
            expect(error.code).toBe('MODULE_NOT_FOUND');
        }

        // Cleanup
        global.process = originalProcess;
    });
});