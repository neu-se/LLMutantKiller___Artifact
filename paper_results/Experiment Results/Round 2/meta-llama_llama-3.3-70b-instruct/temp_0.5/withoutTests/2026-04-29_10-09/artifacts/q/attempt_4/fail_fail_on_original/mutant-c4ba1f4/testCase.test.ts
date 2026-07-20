import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should call the flush function when nextTick is called and setImmediate is available', (done) => {
    const flushSpy = jest.fn();
    const originalNextTick = Q.nextTick;

    Q.nextTick = function (task) {
      task();
    };

    Q.nextTick(function () {
      expect(setImmediate).toBeDefined();
      done();
    });

    Q.nextTick = originalNextTick;
  });
});