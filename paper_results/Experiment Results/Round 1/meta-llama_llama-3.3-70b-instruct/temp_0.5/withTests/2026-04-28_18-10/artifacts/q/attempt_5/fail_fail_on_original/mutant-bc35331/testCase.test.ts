import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q function with nextTick', function () {
    it('should use process.nextTick when process is defined and has nextTick', function (done) {
        var originalNextTick = global.process.nextTick;
        global.process.nextTick = jest.fn();
        Q.nextTick(function () {
            expect(global.process.nextTick).toHaveBeenCalledTimes(1);
            global.process.nextTick = originalNextTick;
            done();
        });
    });

    it('should throw an error when process.toString is an empty string', function () {
        var originalProcessToString = global.process.toString;
        global.process.toString = function() { return ""; };
        expect(function() { Q.nextTick(function () {}); }).toThrow();
        global.process.toString = originalProcessToString;
    });
});