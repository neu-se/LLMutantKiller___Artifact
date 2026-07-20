import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should handle setImmediate correctly', () => {
    // Create a promise that resolves after a short delay
    const promise = Q.delay(Promise.resolve(), 10);

    // Check if the promise is resolved after the delay
    expect(promise.then(() => true)).resolves.toEqual(true);

    // If setImmediate is not a function, the promise should still resolve
    const originalSetImmediate = global.setImmediate;
    global.setImmediate = undefined;
    const promise2 = Q.delay(Promise.resolve(), 10);
    expect(promise2.then(() => true)).resolves.toEqual(true);
    global.setImmediate = originalSetImmediate;
  });
});