import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink abort behavior", () => {
  it("calls read with abort error (not just true) when op returns false and abort is set", () => {
    const abortError = new Error("abort!");
    let sinkRef: any;
    const readCalls: Array<{end: any}> = [];

    const source = (end: any, cb: (end: any, data?: any) => void) => {
      readCalls.push({ end });
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

    // Find the read call that was made from the else-if branch
    // Original: read(abortError, ...) - one of the calls should have abortError
    // Mutated: read(true, ...) - no call with abortError
    const callsWithAbortError = readCalls.filter(c => c.end === abortError);
    expect(callsWithAbortError.length).toBeGreaterThan(0);
  });
});