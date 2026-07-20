import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take', () => {
  it('should not pass last item when last is false', (done) => {
    const test = jest.fn((data: any) => data < 2);
    const opts = { last: false };
    const takeStream = take(test, opts);
    let called = false;
    let lastItem: any;
    takeStream(null, (end: any, data: any) => {
      if (data!== undefined) {
        lastItem = data;
      }
    });
    takeStream(1, (end: any, data: any) => {
      expect(lastItem).toBeUndefined();
      done();
    });
  });
});