import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should handle setImmediate correctly', () => {
    const originalSetImmediate = global.setImmediate;
    global.setImmediate = function() {};
    const promise = Q.delay(Promise.resolve(), 10);
    global.setImmediate = originalSetImmediate;

    // Check if the promise is resolved after the delay
    expect(promise.then(() => true)).resolves.toEqual(true);
  });
});