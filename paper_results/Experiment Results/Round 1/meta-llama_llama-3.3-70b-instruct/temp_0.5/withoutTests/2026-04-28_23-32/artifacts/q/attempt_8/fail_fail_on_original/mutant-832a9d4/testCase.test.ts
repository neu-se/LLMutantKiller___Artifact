import * as q from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q library behavior", () => {
    it("should handle MessageChannel correctly", () => {
        // Arrange
        const originalMessageChannel = global.MessageChannel;
        const originalSetTimeout = global.setTimeout;

        // Act and Assert
        global.MessageChannel = jest.fn().mockImplementation(() => {
            return {
                port1: {
                    onmessage: jest.fn()
                },
                port2: {
                    postMessage: jest.fn()
                }
            };
        });

        global.setTimeout = jest.fn();

        q.nextTick(() => {});

        // If MessageChannel is handled correctly, the nextTick function should use MessageChannel.
        expect(global.MessageChannel).toHaveBeenCalledTimes(1);

        // Clean up
        global.MessageChannel = originalMessageChannel;
        global.setTimeout = originalSetTimeout;
    });
});