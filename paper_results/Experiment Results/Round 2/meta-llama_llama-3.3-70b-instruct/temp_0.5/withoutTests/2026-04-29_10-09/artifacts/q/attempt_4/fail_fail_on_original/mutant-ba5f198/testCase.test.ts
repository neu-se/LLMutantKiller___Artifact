import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should handle setImmediate correctly', () => {
    const originalSetImmediate = global.setImmediate;
    global.setImmediate = null;
    const promise = Q.delay(Promise.resolve(), 10);
    expect(() => promise.then(() => {})).not.toThrow();
    global.setImmediate = originalSetImmediate;
  });
});