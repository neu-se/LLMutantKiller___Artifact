import { makePromise } from "./q";

describe("makePromise with fallback", () => {
  it("should use fallback when descriptor does not have the operation", (done) => {
    const promise = makePromise(
      {},
      function (op: string) {
        return Promise.resolve(`fallback-${op}`);
      }
    );

    promise.dispatch("when", []).then((result) => {
      expect(result).toBe("fallback-when");
      done();
    });
  });
});