import { Q } from "./q";

describe("Promise exception handling", () => {
  it("should reject when a promise descriptor throws an exception", (done) => {
    const promise = Q.Promise({
      when: function() {
        throw new Error("Test error");
      }
    });

    promise.then(
      () => {
        done(new Error("Promise should have been rejected"));
      },
      (error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("Test error");
        done();
      }
    );
  });
});