import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take', () => {
  it('should not pass last item when last is false', () => {
    const test = (data: any) => data < 2;
    const opts = { last: false };
    const takeStream = take(test, opts);
    let result: any;
    takeStream(1, (end: any, data: any) => {
      result = data;
    });
    takeStream(true, (end: any, any) => {
      expect(result).toBe(1);
      expect(data).toBeUndefined();
    });
  });
});