import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should handle setImmediate correctly', () => {
    // Create a promise that resolves after a short delay
    const originalSetImmediate = global.setImmediate;
    global.setImmediate = undefined;
    const promise = Q.delay(Promise.resolve(), 10);
    global.setImmediate = originalSetImmediate;

    // Check if the promise is resolved after the delay
    expect(promise.then(() => true)).resolves.toEqual(true);
  });
});