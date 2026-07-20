import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isStopIteration in Q.async SpiderMonkey path", () => {
  it("rejects when a regular error is thrown in a generator (SpiderMonkey path)", () => {
    // Define StopIteration to trigger the SpiderMonkey code path
    (global as any).StopIteration = {};

    const error = new Error("real error");
    const asyncFn = Q.async(function () {
      // Plain function acting as a SpiderMonkey-style generator
      return {
        next: function () {
          throw error;
        },
        send: function () {
          throw error;
        },
        throw: function () {
          throw error;
        }
      };
    });

    return asyncFn().then(
      (val: unknown) => {
        delete (global as any).StopIteration;
        throw new Error("Expected rejection but got fulfillment with: " + val);
      },
      (err: unknown) => {
        delete (global as any).StopIteration;
        expect(err).toBe(error);
      }
    );
  });
});