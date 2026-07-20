import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q function with nextTick', function () {
    it('should use process.nextTick when process.toString is not an empty string', function (done) {
        var Q = require('../../../../../../../subject_repositories/q/q.js');
        var originalToString = global.process.toString;
        global.process.toString = function() { return "[object process]"; };
        var originalNextTick = global.process.nextTick;
        global.process.nextTick = jest.fn();
        Q.nextTick(function () {
            expect(global.process.nextTick).toHaveBeenCalledTimes(1);
            global.process.nextTick = originalNextTick;
            global.process.toString = originalToString;
            done();
        });
    });

    it('should not use process.nextTick when process.toString is an empty string', function (done) {
        var Q = require('../../../../../../../subject_repositories/q/q.js');
        var originalToString = global.process.toString;
        global.process.toString = function() { return ""; };
        var originalNextTick = global.process.nextTick;
        global.process.nextTick = jest.fn();
        Q.nextTick(function () {
            expect(global.process.nextTick).not.toHaveBeenCalled();
            global.process.nextTick = originalNextTick;
            global.process.toString = originalToString;
            done();
        });
    });
});