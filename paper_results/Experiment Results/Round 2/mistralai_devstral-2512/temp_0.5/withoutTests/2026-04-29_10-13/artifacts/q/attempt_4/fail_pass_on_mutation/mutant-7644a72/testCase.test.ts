const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("QReturnValue mutation test", () => {
  it("should correctly handle Q.return() with a value", () => {
    const testValue = "test";
    let caughtValue: any = null;

    Q.async(function* () {
      try {
        Q["return"](testValue);
        fail("Should have thrown QReturnValue");
      } catch (e) {
        caughtValue = e;
      }
    })()
      .then(() => {
        expect(caughtValue).toBeDefined();
        expect(caughtValue).toBeInstanceOf(Q.QReturnValue);
        expect(caughtValue.value).toBe(testValue);
      });
  });
});