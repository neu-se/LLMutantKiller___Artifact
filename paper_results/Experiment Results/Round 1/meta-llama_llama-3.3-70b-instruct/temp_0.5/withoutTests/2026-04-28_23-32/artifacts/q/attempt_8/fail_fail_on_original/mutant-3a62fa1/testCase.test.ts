import { Q } from "./q";

describe("Q library", () => {
    it("should handle process checks correctly", () => {
        // Arrange
        const originalProcess = global.process;
        global.process = {
            env: {},
            nextTick: () => {}
        } as any;

        // Act and Assert
        expect(Q.longStackSupport).toBe(false);

        // Cleanup
        global.process = originalProcess;
    });
});