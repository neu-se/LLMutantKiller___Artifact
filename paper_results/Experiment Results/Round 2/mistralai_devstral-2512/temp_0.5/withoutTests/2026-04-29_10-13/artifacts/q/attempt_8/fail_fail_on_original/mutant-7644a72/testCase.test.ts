const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("QReturnValue mutation test", () => {
  it("should verify QReturnValue is properly defined based on ReturnValue", () => {
    // Test the actual QReturnValue constructor behavior
    const testValue = "mutation_test";

    // This will fail on mutated code because QReturnValue won't be properly defined
    const returnValue = new Q.QReturnValue(testValue);

    expect(returnValue).toBeDefined();
    expect(returnValue.value).toBe(testValue);
    expect(returnValue.constructor.name).toBe("QReturnValue");
  });
});