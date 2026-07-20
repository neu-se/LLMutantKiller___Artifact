import * as q from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q library behavior", () => {
    it("should handle MessageChannel correctly", () => {
        // Arrange
        const originalMessageChannel = global.MessageChannel;
        const originalSetImmediate = global.setImmediate;

        // Act and Assert
        global.MessageChannel = undefined;
        global.setImmediate = undefined;
        expect(() => {
            q.nextTick(() => {});
        }).not.toThrow();

        // Clean up
        global.MessageChannel = originalMessageChannel;
        global.setImmediate = originalSetImmediate;
    });
});