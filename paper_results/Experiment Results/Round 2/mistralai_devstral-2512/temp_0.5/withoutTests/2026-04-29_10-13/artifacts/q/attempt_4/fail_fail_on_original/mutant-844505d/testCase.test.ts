const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done with domain", () => {
  it("should bind error handler to domain when process.domain exists", (done) => {
    const originalDomain = process.domain;
    const mockDomain = {
      bind: jest.fn((fn) => fn)
    };

    // Mock process.domain
    process.domain = mockDomain;

    const domain = require('domain').create();
    domain.run(() => {
      const promise = Q.reject(new Error("Test error"));
      promise.done(
        () => {
          done(new Error("Promise should have been rejected"));
        },
        (error: Error) => {
          expect(mockDomain.bind).toHaveBeenCalled();
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toBe("Test error");
          process.domain = originalDomain;
          done();
        }
      );
    });
  });
});