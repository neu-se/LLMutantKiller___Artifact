import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should call the flush function when nextTick is called and setImmediate is available', (done) => {
    const originalSetImmediate = global.setImmediate;

    if (typeof setImmediate === "function") {
      Q.nextTick(function () {
        expect(setImmediate).toHaveBeenCalledTimes(1);
      });
    } else {
      Q.nextTick(function () {
        expect(setImmediate).toHaveBeenCalledTimes(0);
      });
    }

    global.setImmediate = originalSetImmediate;
    done();
  });
});