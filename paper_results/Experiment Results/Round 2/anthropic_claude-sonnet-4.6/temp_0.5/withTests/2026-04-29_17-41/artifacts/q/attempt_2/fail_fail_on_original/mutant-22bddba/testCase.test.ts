describe("Q module loading", () => {
  it("sets Q on window when window is defined but self is not defined", () => {
    const savedWindow = (global as any).window;
    const savedSelf = (global as any).self;
    const savedModule = (global as any).module;
    const savedExports = (global as any).exports;

    try {
      const fakeWindow: any = {};
      (global as any).window = fakeWindow;
      delete (global as any).self;
      delete (global as any).module;
      delete (global as any).exports;

      jest.resetModules();
      require("../../../../../../../../../../../subject_repositories/q/q.js");

      expect(fakeWindow.Q).toBeDefined();
      expect(typeof fakeWindow.Q).toBe("function");
    } finally {
      (global as any).window = savedWindow;
      (global as any).self = savedSelf;
      (global as any).module = savedModule;
      (global as any).exports = savedExports;
      jest.resetModules();
    }
  });
});