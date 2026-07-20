import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe("values source", () => {
  it("should iterate only array elements when given an array with extra properties", (done) => {
    const arr: any = [10, 20, 30];
    // Adding a non-index property: Object.keys on this array will include 'extra'
    // Original code: Array.isArray(arr) is true, so skips conversion -> iterates [10, 20, 30]
    // Mutated code: always converts via Object.keys -> includes 'extra' key -> iterates [10, 20, 30, 99]
    arr.extra = 99;

    const read = values(arr, undefined);
    const results: any[] = [];

    function drain(end: any, data: any): void {
      if (end === true) {
        expect(results).toEqual([10, 20, 30]);
        done();
        return;
      }
      if (end) {
        done(end);
        return;
      }
      results.push(data);
      read(null, drain);
    }

    read(null, drain);
  });
});