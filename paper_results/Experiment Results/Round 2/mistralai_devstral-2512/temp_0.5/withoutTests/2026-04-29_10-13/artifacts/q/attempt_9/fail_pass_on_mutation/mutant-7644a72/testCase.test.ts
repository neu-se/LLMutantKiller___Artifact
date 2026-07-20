const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("QReturnValue mutation test", () => {
  it("should properly handle Q.return() in async generator", () => {
    let result: any = null;
    let error: any = null;

    return Q.async(function* () {
      try {
        Q["return"]("test_value");
        return "should_not_reach_here";
      } catch (e) {
        result = e;
        throw e;
      }
    })()
      .then(() => {
        throw new Error("Should have rejected");
      })
      .catch((e: any) => {
        error = e;
        expect(result).toBe(error);
        expect(result.value).toBe("test_value");
      });
  });
});