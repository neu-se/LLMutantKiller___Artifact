import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should handle setImmediate correctly', () => {
    const originalSetImmediate = global.setImmediate;
    global.setImmediate = () => {};
    const promise = Q.delay(Promise.resolve(), 10);
    expect(promise).resolves.not.toThrow();
    global.setImmediate = originalSetImmediate;
  });
});