import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library setImmediate usage", () => {
  it("should use setImmediate when available in browser environment", (done) => {
    // Save original window and setImmediate
    const originalWindow = global.window;
    const originalSetImmediate = global.setImmediate;

    // Mock browser environment with setImmediate
    global.window = {} as any;
    let setImmediateCalled = false;
    global.setImmediate = (callback: Function) => {
      setImmediateCalled = true;
      setTimeout(callback, 0);
      return {} as NodeJS.Immediate;
    };

    // Use Q.defer to create a promise
    const deferred = Q.defer();
    let promiseResolved = false;

    deferred.promise.then(() => {
      promiseResolved = true;
      // Verify that setImmediate was called
      expect(setImmediateCalled).toBe(true);
      done();
    });

    // Resolve the promise
    deferred.resolve("test");

    // Restore originals after a short delay
    setTimeout(() => {
      global.window = originalWindow;
      global.setImmediate = originalSetImmediate;
    }, 100);
  });
});