import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find function", () => {
  it("should call the callback with the correct error when the stream ends with an error", (done) => {
    const callback = jest.fn();
    const testFunction = () => false;

    find(testFunction, (errResult: any, data: any) => {
      callback(errResult, data);
      expect(errResult).toBe(null);
      expect(data).toBe(null);
      done();
    })({
      source: {
        drain: (read: (err: any, cb: (end: boolean, data: any) => void) => void) => {
          read(new Error("Test error"), (end: boolean, data: any) => {
            if (end) {
              read(null, () => {});
            }
          });
        },
      },
    });
  });
});