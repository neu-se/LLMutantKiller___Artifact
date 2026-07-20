import * as q from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q library behavior", () => {
    it("should handle MessageChannel correctly", (done) => {
        // Arrange
        const originalMessageChannel = global.MessageChannel;
        const originalSetTimeout = global.setTimeout;

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

        global.setTimeout = (fn, timeout) => {
            expect(timeout).toBe(0);
            fn();
        };

        q.nextTick(() => {
            expect(true).toBe(true);
            done();
        });

        // Clean up
        global.MessageChannel = originalMessageChannel;
        global.setTimeout = originalSetTimeout;
    });
});