const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function partial application behavior", () => {
  it("should create partial application when first argument is a function with single parameter", () => {
    const funcWithOneParam = (x: any) => x;
    const result = pull(funcWithOneParam);
    expect(typeof result).toBe("function");
    expect(result.length).toBe(1);

    // Test that the partial application works correctly
    const testValue = {};
    const read = (abort: any, cb: any) => cb(null, testValue);
    const partial = result(read);
    expect(typeof partial).toBe("function");
    expect(partial.length).toBe(2);
  });
});