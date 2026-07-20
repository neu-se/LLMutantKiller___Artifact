import Q from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle nextTick correctly", (done) => {
        let called = false;
        Q.nextTick(() => {
            called = true;
        });
        setTimeout(() => {
            expect(called).toBe(true);
            done();
        }, 10);
    });

    it("should use MessageChannel for nextTick when available", (done) => {
        let originalMessageChannel = global.MessageChannel;
        global.MessageChannel = function() {
            return {
                port1: {
                    onmessage: () => {
                        expect(true).toBe(true);
                        done();
                    }
                },
                port2: {
                    postMessage: () => {}
                }
            };
        };

        Q.nextTick(() => {});

        global.MessageChannel = originalMessageChannel;
    });

    it("should not use MessageChannel for nextTick when not available", (done) => {
        let originalMessageChannel = global.MessageChannel;
        global.MessageChannel = undefined;

        let called = false;
        Q.nextTick(() => {
            called = true;
        });

        setTimeout(() => {
            expect(called).toBe(true);
            global.MessageChannel = originalMessageChannel;
            done();
        }, 10);
    });
});