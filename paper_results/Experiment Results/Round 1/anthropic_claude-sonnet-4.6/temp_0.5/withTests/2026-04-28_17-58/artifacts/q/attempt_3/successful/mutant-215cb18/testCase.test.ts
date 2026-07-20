describe("object_defineProperty fallback", () => {
  it("should set property value using fallback when Object.defineProperty is unavailable at module load time", async () => {
    const realDefineProperty = Object.defineProperty.bind(Object);

    // Temporarily nullify Object.defineProperty so the fallback is captured when module loads
    realDefineProperty(Object, "defineProperty", {
      value: null,
      writable: true,
      configurable: true,
    });

    jest.resetModules();

    let QModule: any;
    try {
      QModule = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      // Restore Object.defineProperty immediately
      realDefineProperty(Object, "defineProperty", {
        value: realDefineProperty,
        writable: true,
        configurable: true,
      });
    }

    QModule.longStackSupport = true;

    const errorCaught = await new Promise<Error>((resolve) => {
      QModule()
        .then(() => {
          throw new Error("test error from inner");
        })
        .then(null, (e: Error) => resolve(e));
    });

    QModule.longStackSupport = false;

    // With original fallback: obj[prop] = descriptor.value sets error.stack
    // With mutated fallback: empty function, error.stack is never modified
    expect(errorCaught.stack).toContain("From previous event:");
  });
});