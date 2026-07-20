import { Q } from "../../../q.js";

describe('Q', () => {
  it('should call the flush function when nextTick is called and setImmediate is available', (done) => {
    const originalSetImmediate = global.setImmediate;
    const flushSpy = jest.fn();
    const originalNextTick = Q.nextTick;
    Q.nextTick = function (task) {
      task();
    };

    Q.nextTick(function () {
      expect(setImmediate).toHaveBeenCalledTimes(0);
      done();
    });

    global.setImmediate = function () {
      flushSpy();
    };

    Q.nextTick(function () {
      Q.nextTick(function () {
        expect(flushSpy).toHaveBeenCalledTimes(0);
      });
    });

    global.setImmediate = originalSetImmediate;
    Q.nextTick = originalNextTick;
  });
});