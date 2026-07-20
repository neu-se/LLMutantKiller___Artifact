import flatten from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js";

describe("flatten abort behavior", () => {
  it("should pass the abort error to the outer read when aborting and inner stream ends cleanly", (done) => {
    // Track what abort value the outer read receives
    let outerAbortValue: any = undefined;
    let outerReadCalled = false;

    // Create a simple inner stream that ends immediately (err = true)
    const innerStream = (abort: any, cb: Function) => {
      if (abort) {
        cb(abort);
        return;
      }
      // End immediately
      cb(true);
    };

    // Create an outer read that provides the inner stream
    let innerStreamProvided = false;
    const outerRead = (abort: any, cb: Function) => {
      if (abort !== null && abort !== undefined && abort !== false) {
        outerReadCalled = true;
        outerAbortValue = abort;
        cb(abort);
        return;
      }
      if (!innerStreamProvided) {
        innerStreamProvided = true;
        cb(null, innerStream);
      } else {
        cb(true); // end
      }
    };

    const flattenThrough = flatten();
    const flatStream = flattenThrough(outerRead);

    // First, read one item to set up _read (the inner stream)
    // We need _read to be set so that the abort path goes through _read first
    // But the inner stream ends immediately, so we need to get to a state where
    // _read is set and then we abort

    // Create an inner stream that stays open until aborted
    let innerAbortCb: Function | null = null;
    let innerPending: Function | null = null;
    
    const hangingInnerStream = (abort: any, cb: Function) => {
      if (abort) {
        innerAbortCb = null;
        cb(abort);
        return;
      }
      // Just hang - don't call cb until aborted
      innerPending = cb;
    };

    let outerAbortReceived: any = undefined;
    let outerReadCalledWithAbort = false;

    const outerRead2 = (abort: any, cb: Function) => {
      if (abort !== null && abort !== undefined && abort !== false) {
        outerReadCalledWithAbort = true;
        outerAbortReceived = abort;
        cb(abort);
        return;
      }
      if (!innerStreamProvided) {
        innerStreamProvided = true;
        cb(null, hangingInnerStream);
      } else {
        cb(true);
      }
    };

    innerStreamProvided = false;
    const flattenThrough2 = flatten();
    const flatStream2 = flattenThrough2(outerRead2);

    // Start reading to get _read set to hangingInnerStream
    flatStream2(null, (err: any, data: any) => {
      // This won't be called since hangingInnerStream hangs
    });

    // Now abort - _read is set to hangingInnerStream
    // hangingInnerStream will call cb(abort) with err=abort (truthy)
    // Then original: read(err || abort, cb) = read(abort, cb) - outer gets aborted
    // Mutated: read(err && abort, cb) = read(abort, cb) - same when err is truthy
    
    // We need the case where inner stream's abort callback is called with err=null/falsy
    // Let's make inner stream call cb(null) on abort (clean end)
    
    const cleanAbortInnerStream = (abort: any, cb: Function) => {
      if (abort) {
        // Clean end - no error
        cb(null); // err is null/falsy here
        return;
      }
      // Hang
    };

    innerStreamProvided = false;
    outerReadCalledWithAbort = false;
    outerAbortReceived = undefined;

    const outerRead3 = (abort: any, cb: Function) => {
      if (abort !== null && abort !== undefined && abort !== false) {
        outerReadCalledWithAbort = true;
        outerAbortReceived = abort;
        cb(abort);
        return;
      }
      if (!innerStreamProvided) {
        innerStreamProvided = true;
        cb(null, cleanAbortInnerStream);
      } else {
        cb(true);
      }
    };

    const flattenThrough3 = flatten();
    const flatStream3 = flattenThrough3(outerRead3);

    // Read to set _read
    flatStream3(null, () => {});

    // Now abort with a specific error
    const abortSignal = new Error("abort signal");
    flatStream3(abortSignal, (err: any) => {
      // After abort completes, check that outer read was called with the abort signal
      expect(outerReadCalledWithAbort).toBe(true);
      expect(outerAbortReceived).toBe(abortSignal);
      done();
    });
  });
});