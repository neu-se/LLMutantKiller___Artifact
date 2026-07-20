const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.ninvoke mutation test", () => {
  it("should pass arguments correctly to the invoked method", (done) => {
    const testObject = {
      testMethod: jest.fn((arg1: string, arg2: string, callback: Function) => {
        callback(null, arg1 + arg2);
      })
    };

    Q.ninvoke(testObject, "testMethod", "hello", "world")
      .then((result: string) => {
        expect(result).toBe("helloworld");
        expect(testObject.testMethod).toHaveBeenCalledWith("hello", "world", expect.any(Function));
        done();
      })
      .catch((err: Error) => {
        done(err);
      });
  }, 10000);
});