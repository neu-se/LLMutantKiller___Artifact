import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q library behavior", () => {
    it("should handle MessageChannel correctly", () => {
        // Arrange
        const originalMessageChannel = global.MessageChannel;
        global.MessageChannel = function () {
            return {
                port1: {
                    onmessage: jest.fn()
                },
                port2: {
                    postMessage: jest.fn()
                }
            };
        };

        // Act
        const q = Q();

        // Assert
        expect(q).toBeDefined();

        // Clean up
        global.MessageChannel = originalMessageChannel;
    });
});