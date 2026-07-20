describe("Q module bootstrap behavior", () => {
  it("calls bootstrap when bootstrap is a function in global scope", () => {
    let bootstrapCalled = false;
    let bootstrapName: string | undefined;

    (global as any).bootstrap = (name: string, _definition: Function) => {
      bootstrapCalled = true;
      bootstrapName = name;
    };

    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];

    try {
      require(modulePath);
      expect(bootstrapCalled).toBe(true);
      expect(bootstrapName).toBe("promise");
    } finally {
      delete (global as any).bootstrap;
      delete require.cache[modulePath];
    }
  });
});