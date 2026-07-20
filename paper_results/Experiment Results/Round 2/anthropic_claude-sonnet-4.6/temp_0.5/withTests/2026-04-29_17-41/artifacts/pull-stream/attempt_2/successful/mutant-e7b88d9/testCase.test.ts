import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe("take - error propagation from source", () => {
  it("should call cb with error when source stream errors", (done) => {
    const ERR = new Error("source error");
    let callCount = 0;

    // Source that emits one value then an error
    const source = (end: any, cb: (err: any, data?: any) => void) => {
      if (end) return cb(end);
      callCount++;
      if (callCount === 1) {
        cb(null, 42);
      } else {
        cb(ERR);
      }
    };

    // take(Boolean) - takes while value is truthy
    const through = take(Boolean);
    const reader = through(source);

    // First read should succeed with value 42
    reader(null, (end: any, data: any) => {
      expect(end).toBeNull();
      expect(data).toBe(42);

      // Second read: source returns ERR, take should propagate it via cb(ended)
      // In the mutated code, cb is never called here, causing the test to hang/timeout
      reader(null, (end: any, _data: any) => {
        expect(end).toBe(ERR);
        done();
      });
    });
  });
});