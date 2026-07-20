import { Q } from "./q.js";

describe("Q promise constructor", () => {
  it("should accept a resolver function and resolve with the resolved value", (done) => {
    const expectedValue = "resolved";
    const promise = new Q.Promise((resolve) => {
      resolve(expectedValue);
    });

    promise.then((value) => {
      expect(value).toBe(expectedValue);
      done();
    }).catch((error) => {
      done(error);
    });
  });
});