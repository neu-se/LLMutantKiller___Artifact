import { Q } from "./q.js";

describe("Q.fin test", () => {
  it("should handle valid callback function correctly", (done) => {
    const promise = Q.resolve(42);
    const callback = jest.fn(() => Q.resolve());

    promise.fin(callback)
      .then((value) => {
        expect(value).toBe(42);
        expect(callback).toHaveBeenCalled();
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
});