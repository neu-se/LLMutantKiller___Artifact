describe("QReturnValue initialization", () => {
  it("should use global ReturnValue constructor when it is defined at module load time", () => {
    // Define a custom ReturnValue constructor globally before loading the module
    function CustomReturnValue(this: any, value: any) {
      this.value = value;
    }
    (global as any).ReturnValue = CustomReturnValue;

    // Force module re-evaluation by clearing the cache
    const modulePath = require.resolve("../q.js");
    delete require.cache[modulePath];

    let Q: any;
    try {
      Q = require("../q.js");
    } finally {
      // Clean up global
      delete (global as any).ReturnValue;
      delete require.cache[modulePath];
    }

    let thrownValue: any = null;
    try {
      Q["return"](42);
    } catch (e) {
      thrownValue = e;
    }

    expect(thrownValue).not.toBeNull();
    expect(thrownValue instanceof CustomReturnValue).toBe(true);
    expect((thrownValue as any).value).toBe(42);
  });
});