const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("QReturnValue mutation test", () => {
  it("should correctly handle Q.return() with proper QReturnValue type", () => {
    let caughtException: any = null;
    let hasCorrectType = false;

    Q.async(function* () {
      try {
        Q["return"]("test_value");
      } catch (e) {
        caughtException = e;
        // Check if the exception has the correct constructor name
        hasCorrectType = e.constructor.name === "QReturnValue";
      }
    })()
      .then(() => {
        expect(caughtException).not.toBeNull();
        expect(hasCorrectType).toBe(true);
        expect(caughtException.value).toBe("test_value");
      });
  });
});