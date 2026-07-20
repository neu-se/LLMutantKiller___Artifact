import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink abort behavior", () => {
  it("passes abort error (not true) to read in else-if branch when op returns false", () => {
    const abortError = new Error("abort!");
    let sinkRef: any;
    const endValues: any[] = [];

    const source = (end: any, cb: (end: any, data?: any) => void) => {
      endValues.push(end);
      if (end) {
        cb(end, null);
        return;
      }
      cb(null, "data");
    };

    const op = (_data: any) => {
      sinkRef.abort(abortError);
      return false;
    };

    const doneCallback = jest.fn();

    sinkRef = drain(op, doneCallback);
    sinkRef(source);

    // source should be called with: null (initial), abortError (from sink.abort), abortError or true (from else-if)
    // Original: [null, abortError, abortError] - last call has abortError
    // Mutated: [null, abortError, true] - last call has true
    expect(endValues[endValues.length - 1]).toBe(abortError);
  });
});