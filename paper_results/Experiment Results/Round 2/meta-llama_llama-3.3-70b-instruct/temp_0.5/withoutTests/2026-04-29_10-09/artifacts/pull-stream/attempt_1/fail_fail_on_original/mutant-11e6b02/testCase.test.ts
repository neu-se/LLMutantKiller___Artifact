import { take } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take', () => {
  it('should not pass last item when last is false', (done) => {
    const test = (data: any) => true;
    const opts = { last: false };
    const takeStream = take(test, opts);
    let called = false;
    takeStream(null, (end: any, data: any) => {
      called = true;
      expect(data).toBeUndefined();
      done();
    });
    takeStream(null, (end: any, data: any) => {
      expect(called).toBe(true);
    });
    takeStream(true, (end: any, data: any) => {
      expect(called).toBe(true);
    });
  });
});