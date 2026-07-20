import { Q } from "./q.js";

describe("Q.any behavior with rejected promises", () => {
  it("should resolve when any promise in the array is fulfilled", (done) => {
    const promises = [
      Q.reject(new Error("first error")),
      Q.reject(new Error("second error")),
      Q.resolve("success")
    ];

    Q.any(promises).then((result) => {
      expect(result).toBe("success");
      done();
    }).catch((err) => {
      done(err);
    });
  });
});