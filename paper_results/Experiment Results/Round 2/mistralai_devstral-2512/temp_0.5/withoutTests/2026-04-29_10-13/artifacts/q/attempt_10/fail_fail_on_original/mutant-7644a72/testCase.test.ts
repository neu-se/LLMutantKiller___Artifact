const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("QReturnValue mutation test", () => {
  it("should verify QReturnValue constructor exists and works correctly", () => {
    // Directly test the QReturnValue constructor
    expect(typeof Q.QReturnValue).toBe("function");

    // Test creating an instance
    const returnValue = new Q.QReturnValue("test");
    expect(returnValue).toBeInstanceOf(Q.QReturnValue);
    expect(returnValue.value).toBe("test");

    // Test that Q.return() uses this constructor
    let caughtException: any = null;
    Q.async(function* () {
      try {
        Q["return"]("async_test");
      } catch (e) {
        caughtException = e;
      }
    })().then(() => {
      expect(caughtException).toBeInstanceOf(Q.QReturnValue);
      expect(caughtException.value).toBe("async_test");
    });
  });
});