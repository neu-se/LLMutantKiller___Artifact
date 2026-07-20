import { filter } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js";

describe('filter function', () => {
  it('should correctly handle synchronous and asynchronous behavior', (done) => {
    const test = (data: any) => data!== null;
    const filterStream = filter(test);
    let readCount = 0;
    let endCount = 0;
    let dataCount = 0;
    const read = (end: any, cb: (end: any, data: any) => void) => {
      readCount++;
      if (readCount === 1) {
        cb(null, 'test');
      } else if (readCount === 2) {
        cb(true, null);
      }
    };
    const next = filterStream(read);
    next(null, (end: any, data: any) => {
      endCount++;
      if (end) {
        expect(endCount).toBe(1);
        expect(data).toBeNull();
      } else {
        dataCount++;
        expect(data).toBe('test');
        next(end, (end: any, data: any) => {
          endCount++;
          if (end) {
            expect(endCount).toBe(2);
            expect(data).toBeNull();
            done();
          }
        });
      }
    });
  });
});