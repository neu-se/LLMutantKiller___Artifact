import { take } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take', () => {
  it('should pass last item when last is true and fail when last is false in mutated code', (done) => {
    const test = (data: any) => data < 2;
    const opts = { last: false };
    const takeStream = take(test, opts);
    let called = false;
    let lastItem = null;
    takeStream(null, (end: any, data: any) => {
      if (data !== undefined) {
        lastItem = data;
      }
    });
    takeStream(null, (end: any, data: any) => {
      if (data !== undefined) {
        lastItem = data;
      }
    });
    takeStream(null, (end: any, data: any) => {
      expect(lastItem).toBeUndefined();
      done();
    });
    takeStream(true, (end: any, data: any) => {
      expect(lastItem).toBeUndefined();
    });
  });
});