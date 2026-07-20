import { Q } from "./q";

describe("Q.nodeify", () => {
  it("should call the nodeback with the resolved value when provided", (done) => {
    const expectedValue = "test";
    const promise = Q.resolve(expectedValue);

    promise.nodeify((error, value) => {
      expect(error).toBeNull();
      expect(value).toBe(expectedValue);
      done();
    });
  });
});