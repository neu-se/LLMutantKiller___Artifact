import { jest } from "@jest/globals";

describe("Q.async SpiderMonkey return value handling", () => {
  it("should fulfill (not reject) when Q.return is used in a SpiderMonkey-style generator", (done) => {
    // Simulate SpiderMonkey environment by defining StopIteration globally
    (global as any).StopIteration = {};

    // Re-require Q so it picks up the StopIteration global
    jest.resetModules();
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Create a fake SpiderMonkey-style generator that throws QReturnValue on next()
    const returnValue = 42;
    let called = false;
    const fakeGenerator = {
      next: function () {
        if (!called) {
          called = true;
          // Simulate Q["return"](42) - throw a QReturnValue
          Q["return"](returnValue);
        }
      },
      throw: function (e: any) {
        throw e;
      }
    };

    const asyncFn = Q.async(function () {
      return fakeGenerator;
    });

    asyncFn().then(
      function (value: unknown) {
        expect(value).toBe(returnValue);
        delete (global as any).StopIteration;
        done();
      },
      function (err: unknown) {
        delete (global as any).StopIteration;
        done(new Error("Expected fulfillment but got rejection: " + err));
      }
    );
  });
});