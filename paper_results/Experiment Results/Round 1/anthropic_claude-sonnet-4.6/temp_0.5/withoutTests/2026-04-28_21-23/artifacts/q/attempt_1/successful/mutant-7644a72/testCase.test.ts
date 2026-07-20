// Jest test file
describe("Q.return with global ReturnValue", () => {
  it("should use global ReturnValue if defined", async () => {
    // Set global ReturnValue before requiring Q
    function ReturnValue(this: any, value: any) {
      this.value = value;
    }
    (global as any).ReturnValue = ReturnValue;
    
    // Need to re-require Q after setting global
    jest.resetModules();
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    let thrown: any = null;
    try {
      Q["return"](42);
    } catch (e) {
      thrown = e;
    }
    
    expect(thrown).toBeInstanceOf(ReturnValue);
    expect(thrown.value).toBe(42);
    
    delete (global as any).ReturnValue;
  });
});