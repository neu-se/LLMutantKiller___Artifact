import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.ninvoke", () => {
  it("should invoke a method with arguments and return a promise", (done) => {
    const obj = {
      method: function(arg1: string, arg2: string, callback: (err: Error | null, result?: string) => void) {
        callback(null, arg1 + arg2);
      }
    };

    const promise = Q(obj).ninvoke("method", "hello", "world");

    expect(promise).toBeInstanceOf(Q.makePromise);

    promise.then((result: string) => {
      expect(result).toBe("helloworld");
      done();
    }).catch((err: Error) => {
      done(err);
    });
  });
});