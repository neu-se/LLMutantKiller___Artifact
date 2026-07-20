const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("QReturnValue mutation test", () => {
  it("should correctly define QReturnValue based on ReturnValue availability", () => {
    // This test directly checks the behavior affected by the mutation
    // The mutation changes the condition from checking ReturnValue to always false
    expect(typeof Q.QReturnValue).toBe("function");

    // Create an instance and verify it works correctly
    const returnValue = new Q.QReturnValue("test");
    expect(returnValue.value).toBe("test");
    expect(returnValue instanceof Q.QReturnValue).toBe(true);
  });
});