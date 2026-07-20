import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take', () => {
  it('should not pass last item when last is false', () => {
    const test = (data: any) => data < 2;
    const opts = { last: false };
    const takeStream = take(test, opts);
    let result: any;
    takeStream(null, (end: any, data: any) => {
      if (end === true) {
        expect(data).toBeUndefined();
      } else {
        result = data;
      }
    });
    takeStream(2, (end: any, data: any) => {
      expect(result).toBe(1);
    });
  });
});