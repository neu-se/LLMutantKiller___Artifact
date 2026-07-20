import { asyncMap } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe('asyncMap', () => {
  it('should call read with abort when busy is false', (done) => {
    let readCalled = false;
    let abortCbCalled = false;

    const read = asyncMap(function (data: any, cb: any) {
      cb(null, data);
    })(function (end: any, cb: any) {
      readCalled = true;
      if (end) {
        cb(end);
      } else {
        cb(null, 10);
      }
    });

    read(true, function (end: any) {
      expect(readCalled).toBe(true);
      done();
    });
  });
})