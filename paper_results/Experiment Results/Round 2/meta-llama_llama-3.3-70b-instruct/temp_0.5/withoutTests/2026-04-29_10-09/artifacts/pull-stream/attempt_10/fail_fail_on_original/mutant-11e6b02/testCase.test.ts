import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take', () => {
  it('should not pass last item when last is false', (done) => {
    const test = (data: any) => data < 2;
    const opts = { last: false };
    const takeStream = take(test, opts);
    let results: any[] = [];
    takeStream(null, (end: any, data: any) => {
      if (end === true) {
        expect(data).toBeUndefined();
        done();
      } else {
        results.push(data);
      }
    });
    takeStream(1, () => {});
    takeStream(2, () => {});
  });
});