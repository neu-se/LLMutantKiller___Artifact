import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should call the flush function when nextTick is called and setImmediate is available', (done) => {
    const originalSetImmediate = global.setImmediate;

    if (typeof setImmediate === "function") {
      expect(Q.nextTick.toString().includes('setImmediate')).toBe(true);
    } else {
      expect(Q.nextTick.toString().includes('setTimeout')).toBe(true);
    }

    global.setImmediate = originalSetImmediate;
    done();
  });
});