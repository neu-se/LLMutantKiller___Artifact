import { Q } from "./q.js";

describe("Q promise resolution", () => {
  it("should resolve a promise and allow chaining", (done) => {
    const expectedValue = "resolved value";
    Q.resolve(expectedValue)
      .then((value: string) => {
        expect(value).toBe(expectedValue);
        done();
      });
  });
});