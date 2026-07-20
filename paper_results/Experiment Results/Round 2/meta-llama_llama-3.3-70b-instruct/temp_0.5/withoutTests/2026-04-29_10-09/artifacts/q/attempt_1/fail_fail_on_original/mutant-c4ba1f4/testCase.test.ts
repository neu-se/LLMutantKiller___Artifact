import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should call the flush function when nextTick is called and setImmediate is available', (done) => {
    const originalSetImmediate = global.setImmediate;
    const flushSpy = jest.fn();
    Q.nextTick = (function () {
      var head = { task: void 0, next: null };
      var tail = head;
      var flushing = false;
      var requestTick = void 0;
      var isNodeJS = false;

      function flush() {
        flushSpy();
      }

      Q.nextTick = function (task) {
        tail = tail.next = {
          task: task,
          domain: isNodeJS && process.domain,
          next: null
        };

        if (!flushing) {
          flushing = true;
          requestTick();
        }
      };

      if (typeof setImmediate === "function") {
        requestTick = function () {
          setImmediate(flush);
        };
      }
      return Q.nextTick;
    })();

    Q.nextTick(() => {});
    expect(flushSpy).toHaveBeenCalledTimes(1);
    global.setImmediate = originalSetImmediate;
    done();
  });
});