import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe('asyncMap', () => {
  it('should call read with abort when busy is false', (done) => {
    let readCount = 0;

    const read = asyncMap(function (data: any, cb: any) {
      cb(null, data);
    })(function (end: any, cb: any) {
      readCount++;
      if (end) {
        cb(end);
      } else {
        cb(null, 10);
      }
    });

    read(null, function (end: any, data: any) {
      read(true, function (end: any) {
        expect(readCount).toBeGreaterThan(1);
        done();
      });
    });
  });
})