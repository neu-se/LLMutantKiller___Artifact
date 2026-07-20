import * as filterModule from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js";

describe('filter', () => {
  it('should filter out elements that do not match the test function', (done) => {
    const test = (data: any) => data > 0.5;
    const read = filterModule.default(test);
    let count = 0;
    read((end: any, cb: any) => {
      if (end) {
        expect(count).toBe(1);
        done();
      } else {
        count++;
        cb(null, 1);
      }
    });
  });
});