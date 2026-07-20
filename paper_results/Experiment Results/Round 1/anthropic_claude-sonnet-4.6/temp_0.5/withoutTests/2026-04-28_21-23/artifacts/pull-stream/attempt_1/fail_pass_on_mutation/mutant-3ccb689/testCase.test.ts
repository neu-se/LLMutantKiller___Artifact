import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe("asyncMap abort after aborted state", () => {
  it("should call cb with abort error when read is called after stream has been aborted", (done) => {
    // Create a source that simulates a slow async operation
    let readCount = 0;
    let pendingCb: ((end: any, data?: any) => void) | null = null;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
        return;
      }
      readCount++;
      if (readCount === 1) {
        // First read: hold the callback to simulate async
        pendingCb = cb;
      } else {
        cb(null, readCount);
      }
    };

    const abortError = new Error("abort");
    const results: any[] = [];

    // Create a slow map function that takes time
    let mapCb: ((err: any, data?: any) => void) | null = null;
    const slowMap = (data: any, cb: (err: any, data?: any) => void) => {
      mapCb = cb;
    };

    const through = asyncMap(slowMap)(source);

    // Start reading - this will trigger source read and map
    through(null, (end: any, data: any) => {
      results.push({ end, data });
    });

    // Release the first read so map starts
    if (pendingCb) {
      pendingCb(null, 1);
    }

    // Now abort while map is busy
    through(abortError, (err: any) => {
      results.push({ abortResult: err });
    });

    // Complete the map operation
    if (mapCb) {
      mapCb(null, 100);
    }

    // Now try to read again - with original code, since aborted is set,
    // it should immediately call cb(aborted) without reading from source
    let secondReadCalled = false;
    through(null, (end: any, data: any) => {
      secondReadCalled = true;
      // In original code: cb(aborted) is called immediately
      // In mutated code: it tries to read from source instead
      expect(end).toBe(abortError);
      expect(data).toBeUndefined();
      done();
    });

    // If the mutation is present, the second read won't immediately return aborted
    // and will try to read from source. We need to handle that case.
    // Give it a tick to see if done was called
    setTimeout(() => {
      if (!secondReadCalled) {
        // Mutation detected: cb was not called with aborted error
        done(new Error("Expected cb to be called with abort error immediately, but it was not called"));
      }
    }, 50);
  });
});