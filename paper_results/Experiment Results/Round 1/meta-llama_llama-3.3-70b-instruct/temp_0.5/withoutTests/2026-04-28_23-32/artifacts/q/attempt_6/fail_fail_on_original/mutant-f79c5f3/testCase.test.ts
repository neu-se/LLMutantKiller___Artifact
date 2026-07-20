import { Q } from "../q";

describe("Q.any", () => {
  it("should resolve if one promise is resolved", () => {
    const promise1 = Q.reject("error1");
    const promise2 = Q.resolve("success");
    const promise3 = Q.reject("error3");

    return Q.any([promise1, promise2, promise3]).then(
      (value) => {
        expect(value).toBe("success");
      }
    );
  });
});