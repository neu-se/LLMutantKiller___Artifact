import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q.ninvoke", () => {
  it("should invoke a method with arguments and return a promise", (done) => {
    const obj = {
      method: jest.fn((arg1: string, arg2: string, callback: (err: Error | null, result?: string) => void) => {
        callback(null, arg1 + arg2);
      })
    };

    Q.ninvoke(obj, "method", "hello", "world")
      .then((result: string) => {
        expect(result).toBe("helloworld");
        expect(obj.method).toHaveBeenCalledWith("hello", "world", expect.any(Function));
        done();
      })
      .catch((err: Error) => {
        done(err);
      });
  });
});