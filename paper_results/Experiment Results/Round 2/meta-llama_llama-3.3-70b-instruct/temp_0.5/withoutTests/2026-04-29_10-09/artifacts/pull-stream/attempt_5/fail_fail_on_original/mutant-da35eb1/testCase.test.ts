import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find function", () => {
  it("should call the callback with the correct error when the stream ends with an error", (done) => {
    const callback = jest.fn();
    const testFunction = () => false;
    const err = new Error("Test error");

    const stream = {
      source: {
        drain: (read: (err: any, cb: (end: any, data: any) => void) => void) => {
          read(err, () => {});
        },
      },
    };

    find(testFunction, (errResult: any, data: any) => {
      callback(errResult, data);
      expect(errResult).toBe(null);
      expect(data).toBe(null);
      done();
    })(stream.source);
  });
});