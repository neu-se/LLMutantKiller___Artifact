import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find function", () => {
  it("should call the callback with the correct error when the stream ends with an error", (done) => {
    const callback = jest.fn();
    const testFunction = () => false;
    const err = new Error("Test error");

    const read = jest.fn((err: any, cb: (end: any, data: any) => void) => {
      cb(err, null);
    });

    find(testFunction, (errResult: any, data: any) => {
      callback(errResult, data);
      expect(errResult).toBeInstanceOf(Error);
      expect(errResult.message).toBe("Test error");
      done();
    })({ drain: read });
  });
});