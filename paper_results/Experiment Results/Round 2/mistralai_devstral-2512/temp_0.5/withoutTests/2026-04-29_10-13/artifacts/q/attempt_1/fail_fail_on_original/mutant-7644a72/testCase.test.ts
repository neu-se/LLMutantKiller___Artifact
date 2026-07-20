import { Q } from "./q";

describe("QReturnValue mutation test", () => {
  it("should correctly handle Q.return() with a value", () => {
    const testValue = "test";
    let result: any = null;
    let error: any = null;

    Q.async(function* () {
      try {
        Q["return"](testValue);
      } catch (e) {
        result = e;
        throw e;
      }
    })()
      .then(() => {
        throw new Error("Promise should have been rejected");
      })
      .catch((e) => {
        error = e;
      })
      .finally(() => {
        expect(result).toBeInstanceOf(Q.QReturnValue);
        expect(result.value).toBe(testValue);
        expect(error).toBeInstanceOf(Q.QReturnValue);
      });
  });
});