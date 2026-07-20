import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.any", () => {
  it("should resolve if one promise is resolved", () => {
    const promise1 = Q.reject("error1");
    const promise2 = Q.reject("error2");
    const promise3 = Q.resolve("success");

    return Q.any([promise1, promise2, promise3]).then(
      (value) => {
        expect(value).toBe("success");
      },
      (error) => {
        throw new Error("Expected Q.any to resolve");
      }
    );
  });
});