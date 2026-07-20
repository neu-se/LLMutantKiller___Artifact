import { once } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/once.js";

describe('once source behavior on abort', () => {
  it('should call onAbort callback when stream is aborted', (done) => {
    let onAbortCalled = false;
    const onAbort = () => {
      onAbortCalled = true;
    };

    const read = once(42, onAbort);

    // First read should return the value
    read(null, (end, data) => {
      expect(end).toBeNull();
      expect(data).toBe(42);

      // Now abort the stream
      read(true, (abortEnd) => {
        expect(abortEnd).toBe(true);
        // Give a tick for the onAbort callback to be called
        setImmediate(() => {
          expect(onAbortCalled).toBe(true);
          done();
        });
      });
    });
  });
});