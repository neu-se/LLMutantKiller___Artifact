// Test to detect the mutation in q.js where MessageChannel handling is removed
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick behavior with MessageChannel", () => {
    it("should use MessageChannel when available for async scheduling", (done) => {
        // Save original MessageChannel
        const originalMessageChannel = global.MessageChannel;

        // Mock MessageChannel to track if it's being used
        let messageChannelUsed = false;
        global.MessageChannel = function() {
            messageChannelUsed = true;
            const channel = {
                port1: {
                    onmessage: (e: any) => {},
                    postMessage: () => {}
                },
                port2: {
                    postMessage: () => {
                        if (channel.port1.onmessage) {
                            channel.port1.onmessage({ data: 0 });
                        }
                    }
                }
            };
            return channel;
        } as any;

        // Test that Q.nextTick uses MessageChannel when available
        let tickExecuted = false;
        Q.nextTick(() => {
            tickExecuted = true;
        });

        // Give some time for the async operation to complete
        setTimeout(() => {
            // Restore original MessageChannel
            global.MessageChannel = originalMessageChannel;

            // In the original code, MessageChannel should be used
            // In the mutated code, it won't be used
            expect(messageChannelUsed).toBe(true);
            expect(tickExecuted).toBe(true);
            done();
        }, 100);
    });
});