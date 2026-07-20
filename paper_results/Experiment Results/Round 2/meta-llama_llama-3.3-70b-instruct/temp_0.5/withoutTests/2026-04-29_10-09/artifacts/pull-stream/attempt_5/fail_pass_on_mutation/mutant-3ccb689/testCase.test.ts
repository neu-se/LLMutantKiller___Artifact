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
      cb(null, data);
    };

    const stream = asyncMap(map)(read);
    stream(true, (err: any, data: any) => {
      callbackCalled = true;
      expect(err).not.toBeNull();
    });

    setTimeout(() => {
      expect(callbackCalled).toBe(true);
      done();
    }, 10);
  });
});