import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick function", function () {
    it("should throw an error when setImmediate is not defined and MessageChannel is not defined", function () {
        var originalSetImmediate = global.setImmediate;
        var originalMessageChannel = global.MessageChannel;
        global.setImmediate = undefined;
        global.MessageChannel = undefined;
        expect(function () {
            Q.nextTick(function () {});
        }).toThrowError("This environment was not anticipated by Q. Please file a bug.");
        global.setImmediate = originalSetImmediate;
        global.MessageChannel = originalMessageChannel;
    });
});