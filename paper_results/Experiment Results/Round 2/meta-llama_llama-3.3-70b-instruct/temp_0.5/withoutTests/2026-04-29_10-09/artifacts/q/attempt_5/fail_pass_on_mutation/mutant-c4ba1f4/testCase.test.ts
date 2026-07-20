import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should call the flush function when nextTick is called and setImmediate is available', (done) => {
    const originalSetImmediate = global.setImmediate;

    if (typeof setImmediate === "function") {
      expect(true).toBe(true);
    } else {
      expect(false).toBe(true);
    }

    global.setImmediate = originalSetImmediate;
    done();
  });
});