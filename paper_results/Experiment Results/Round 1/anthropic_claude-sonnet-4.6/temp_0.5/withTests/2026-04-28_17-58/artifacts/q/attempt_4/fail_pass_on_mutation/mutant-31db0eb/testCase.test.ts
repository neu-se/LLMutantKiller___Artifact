describe("Q module initialization in non-Node environment without setImmediate or window", () => {
  it("should not throw during initialization when setImmediate and window are both absent", () => {
    jest.resetModules();

    const savedProcess = global.process;
    const savedSetImmediate = (global as any).setImmediate;
    const savedWindow = (global as any).window;
    const savedMessageChannel = (global as any).MessageChannel;

    try {
      // Simulate non-Node environment
      (global as any).process = {
        toString: () => "[object Object]",
        env: {},
      };
      // Remove setImmediate so typeof setImmediate !== "function" is TRUE -> enters that branch
      delete (global as any).setImmediate;
      // Remove window: original takes else branch safely, mutated takes if(true) -> TypeError
      delete (global as any).window;
      // Remove MessageChannel to prevent that branch
      delete (global as any).MessageChannel;

      // Original: requestTick = function() { setImmediate(flush); } -> no throw during init
      // Mutated: setImmediate.bind(window, flush) where setImmediate is undefined -> TypeError
      expect(() => {
        require("../../../../../../../../../../../subject_repositories/q/q.js");
      }).not.toThrow();
    } finally {
      global.process = savedProcess;
      if (savedSetImmediate !== undefined) {
        (global as any).setImmediate = savedSetImmediate;
      }
      if (savedWindow !== undefined) {
        (global as any).window = savedWindow;
      }
      if (savedMessageChannel !== undefined) {
        (global as any).MessageChannel = savedMessageChannel;
      }
    }
  });
});