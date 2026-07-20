const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("QReturnValue mutation test", () => {
  it("should use the correct QReturnValue implementation based on ReturnValue availability", () => {
    // Test that Q.return() throws the correct type of exception
    let caughtException: any = null;

    Q.async(function* () {
      try {
        Q["return"]("test_value");
      } catch (e) {
        caughtException = e;
      }
      return "completed";
    })()
      .then((result: any) => {
        // Verify the exception was caught and is the right type
        expect(caughtException).not.toBeNull();
        expect(typeof caughtException.value).toBe("string");
        expect(caughtException.value).toBe("test_value");

        // Verify the async function completed normally
        expect(result).toBe("completed");
      });
  });
});