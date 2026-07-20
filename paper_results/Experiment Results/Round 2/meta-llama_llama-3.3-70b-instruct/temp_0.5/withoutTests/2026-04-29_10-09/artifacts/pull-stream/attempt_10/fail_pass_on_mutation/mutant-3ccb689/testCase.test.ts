import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe('asyncMap', () => {
  it('should abort the stream when aborted is true', (done) => {
    let callbackCalled = false;

    const read = (abort: any, cb: (err: any, data: any) => void) => {
      if (abort) {
        cb(abort, null);
      } else {
        cb(null, 'data');
      }
    };

    const map = (data: any, cb: (err: any, data: any) => void) => {
      // Simulate a long-running operation
      setTimeout(() => {
        cb(null, data);
      }, 10);
    };

    const stream = asyncMap(map)(read);
    stream(null, (err: any, data: any) => {
      stream(true, (err: any, data: any) => {
        callbackCalled = true;
        expect(err).not.toBeNull();
      });
      // Call the stream again to test if it's aborted
      stream(null, (err: any, data: any) => {
        expect(callbackCalled).toBe(true);
        expect(err).not.toBeNull();
        done();
      });
    });
  });
});