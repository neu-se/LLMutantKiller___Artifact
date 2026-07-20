import { Q } from "./q";

describe("Q.coerce", () => {
  it("should reject when a thenable throws an exception", (done) => {
    const thenable = {
      then: function() {
        throw new Error("Test error");
      }
    };

    Q(thenable)
      .then(() => {
        done(new Error("Promise should have been rejected"));
      })
      .catch((error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("Test error");
        done();
      });
  });
});