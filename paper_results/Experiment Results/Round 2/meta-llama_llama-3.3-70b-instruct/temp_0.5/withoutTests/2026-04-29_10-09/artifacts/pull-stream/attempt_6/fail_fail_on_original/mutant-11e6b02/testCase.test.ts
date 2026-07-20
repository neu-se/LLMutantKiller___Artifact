import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take', () => {
  it('should not pass last item when last is false', (done) => {
    const test = (data: any) => data < 2;
    const opts = { last: false };
    const takeStream = take(test, opts);
    let result: any;
    takeStream(null, (err: any, data: any) => {
      result = data;
      takeStream(true, (err: any, data: any) => {
        expect(result).toBeUndefined();
        done();
      });
    });
    takeStream(1, () => {});
  });
});