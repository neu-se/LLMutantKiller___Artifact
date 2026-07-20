import * as q from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q library behavior", () => {
    it("should handle MessageChannel correctly", () => {
        // Arrange
        const originalMessageChannel = global.MessageChannel;

        // Act and Assert
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

        const nextTickSpy = jest.fn();
        q.nextTick(nextTickSpy);

        // If MessageChannel is handled correctly, the nextTick function should use MessageChannel.
        expect(global.MessageChannel).toHaveBeenCalledTimes(1);

        // Clean up
        global.MessageChannel = originalMessageChannel;
    });
});