import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick function", function () {
    it("should use setImmediate when available, even if MessageChannel is also available", function () {
        var originalSetImmediate = global.setImmediate;
        var originalMessageChannel = global.MessageChannel;
        var calledSetImmediate = false;
        var calledMessageChannel = false;
        global.setImmediate = function (callback) {
            calledSetImmediate = true;
            callback();
        };
        global.MessageChannel = function () {
            return {
                port1: {
                    onmessage: function (callback) {
                        calledMessageChannel = true;
                        callback();
                    }
                },
                port2: {
                    postMessage: function () {}
                }
            };
        };
        Q.nextTick(function () {});
        expect(calledSetImmediate).toBe(true);
        expect(calledMessageChannel).toBe(false);
        global.setImmediate = originalSetImmediate;
        global.MessageChannel = originalMessageChannel;
    });
});