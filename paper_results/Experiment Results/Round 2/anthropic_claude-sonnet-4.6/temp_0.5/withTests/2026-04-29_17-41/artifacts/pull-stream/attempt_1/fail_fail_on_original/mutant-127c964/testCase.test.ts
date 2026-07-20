import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe("values source with array input", () => {
  it("should iterate array elements in order without converting array keys to strings", (done) => {
    const arr = [10, 20, 30];
    // Add a non-index property to the array - Object.keys will include it, but original code won't
    (arr as any).extra = 99;

    const read = values(arr, undefined);
    const results: number[] = [];

    function drain(end: any, data: any) {
      if (end === true) {
        // Original: [10, 20, 30] (skips conversion since Array.isArray is true)
        // Mutated: Object.keys([10,20,30] with extra) = ['0','1','2','extra'], values = [10,20,30,99]
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