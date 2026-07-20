import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick function", function () {
    it("should use setTimeout as a fallback when setImmediate and MessageChannel are not available", function (done) {
        var originalSetImmediate = global.setImmediate;
        var originalMessageChannel = global.MessageChannel;
        global.setImmediate = undefined;
        global.MessageChannel = undefined;
        var originalSetTimeout = global.setTimeout;
        var spy = jest.fn();
        global.setTimeout = spy;
        Q.nextTick(function () {
            expect(spy).toHaveBeenCalledTimes(1);
            global.setImmediate = originalSetImmediate;
            global.MessageChannel = originalMessageChannel;
            global.setTimeout = originalSetTimeout;
            done();
        });
    });
});