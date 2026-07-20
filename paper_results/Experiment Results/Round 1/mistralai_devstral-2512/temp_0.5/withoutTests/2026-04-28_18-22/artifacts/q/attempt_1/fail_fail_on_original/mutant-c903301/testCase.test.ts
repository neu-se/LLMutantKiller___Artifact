import { Q } from "./q";

describe("Q promise progress handling", () => {
  it("should throw errors from progress handlers", (done) => {
    const error = new Error("Progress handler error");
    const promise = Q.resolve(42);

    promise.then(
      () => {},
      () => {},
      () => {
        throw error;
      }
    ).then(
      () => {
        done(new Error("Expected promise to be rejected"));
      },
      (e) => {
        expect(e).toBe(error);
        done();
      }
    );
  });
});