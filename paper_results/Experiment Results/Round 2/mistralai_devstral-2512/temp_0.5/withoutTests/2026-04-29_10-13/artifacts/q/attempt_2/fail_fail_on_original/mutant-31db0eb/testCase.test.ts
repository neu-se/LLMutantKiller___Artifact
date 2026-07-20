import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library setImmediate detection", () => {
  it("should correctly detect setImmediate availability in non-browser environments", (done) => {
    // Save original setImmediate and window
    const originalSetImmediate = global.setImmediate;
    const originalWindow = (global as any).window;

    // Setup test environment to simulate Node.js
    (global as any).window = undefined;
    global.setImmediate = jest.fn((fn: Function) => {
      setTimeout(fn, 0);
      return { unref: () => {} };
    });

    // Track which mechanism was used
    let usedSetImmediate = false;
    const originalNextTick = Q.nextTick;
    Q.nextTick = function(task: Function) {
      if (global.setImmediate && !usedSetImmediate) {
        usedSetImmediate = true;
      }
      return originalNextTick(task);
    };

    // Create and resolve a promise
    Q.resolve("test").then(() => {
      // Verify setImmediate was used
      expect(usedSetImmediate).toBe(true);
      expect(global.setImmediate).toHaveBeenCalled();

      // Restore environment
      global.setImmediate = originalSetImmediate;
      (global as any).window = originalWindow;
      Q.nextTick = originalNextTick;
      done();
    }).catch((err) => {
      // Restore environment
      global.setImmediate = originalSetImmediate;
      (global as any).window = originalWindow;
      Q.nextTick = originalNextTick;
      done(err);
    });

    // Safety timeout
    setTimeout(() => {
      global.setImmediate = originalSetImmediate;
      (global as any).window = originalWindow;
      Q.nextTick = originalNextTick;
      done.fail("Test timed out");
    }, 200);
  });
});