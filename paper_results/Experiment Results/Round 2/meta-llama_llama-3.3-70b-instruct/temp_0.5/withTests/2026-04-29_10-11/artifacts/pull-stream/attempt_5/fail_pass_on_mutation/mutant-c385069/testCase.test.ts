import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe('asyncMap', () => {
  it('should call read with abort when busy is false', (done) => {
    let readCalled = false;
    let abortCbCalled = false;

    const read = asyncMap(function (data: any, cb: any) {
      cb(null, data);
    })(function (end: any, cb: any) {
      if (end) {
        if (end === true) {
          abortCbCalled = true;
        }
        cb(end);
      } else {
        readCalled = true;
        cb(null, 10);
      }
    });

    read(true, function (end: any) {
      expect(abortCbCalled).toBe(true);
      done();
    });
  });
})