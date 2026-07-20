import { Q } from "./q.js";

describe("Q.done with domain", () => {
  it("should handle errors in a domain context", (done) => {
    const domain = require('domain').create();
    domain.run(() => {
      const promise = Q.reject(new Error("Test error"));
      promise.done(
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
});