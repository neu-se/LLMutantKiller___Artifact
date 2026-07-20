import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values source', () => {
  it('should stream only indexed array elements when given an array with extra enumerable properties', (done) => {
    const arr: any = [1, 2, 3];
    arr.extra = 99;

    const read = values(arr);
    const results: any[] = [];

    function drain(end: any, data: any): void {
      if (end === true) {
        expect(results).toEqual([1, 2, 3]);
        done();
        return;
      }
      if (end) { done(end); return; }
      results.push(data);
      read(null, drain);
    }

    read(null, drain);
  });
});