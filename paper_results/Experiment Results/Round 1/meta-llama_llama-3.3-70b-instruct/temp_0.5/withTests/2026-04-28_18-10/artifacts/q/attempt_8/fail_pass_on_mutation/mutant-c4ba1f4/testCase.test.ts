import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick function", function () {
    it("should use setImmediate when available, even if MessageChannel is also available", function (done) {
        var originalSetImmediate = global.setImmediate;
        var originalMessageChannel = global.MessageChannel;
        global.setImmediate = function (callback) {
            callback();
        };
        global.MessageChannel = function () {
            return {
                port1: {
                    onmessage: function (callback) {
                        callback();
                    }
                },
                port2: {
                    postMessage: function () {}
                }
            };
        };
        var called = false;
        Q.nextTick(function () {
            called = true;
        });
        expect(called).toBe(false);
        setTimeout(function () {
            expect(called).toBe(true);
            global.setImmediate = originalSetImmediate;
            global.MessageChannel = originalMessageChannel;
            done();
        }, 10);
    });
});