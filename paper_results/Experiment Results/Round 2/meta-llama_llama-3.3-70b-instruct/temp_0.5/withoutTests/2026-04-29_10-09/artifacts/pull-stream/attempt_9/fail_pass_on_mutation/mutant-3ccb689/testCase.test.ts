import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe('asyncMap', () => {
  it('should abort the stream when aborted is true', (done) => {
    let callbackCalledWithAbort = false;
    let callbackCalledWithNull = false;

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
    stream(null, (err: any, data: any) => {
      stream(true, (err: any, data: any) => {
        callbackCalledWithAbort = true;
        expect(err).not.toBeNull();
      });
    });

    setTimeout(() => {
      expect(callbackCalledWithAbort).toBe(true);
      done();
    }, 10);
  });
});