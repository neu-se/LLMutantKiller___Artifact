import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js"

describe("values source", () => {
  it("should treat array input as-is without Object.keys conversion, preserving array length behavior", (done) => {
    // Create an array where Object.keys would produce different results
    // Object.keys on a sparse array skips holes, but array.length includes them
    const input: any[] = [1, 2, 3];
    // Add a non-index string property to the array
    (input as any)["foo"] = 99;

    const source = values(input);
    const results: any[] = [];

    function read() {
      source(null, (end: any, data: any) => {
        if (end === true) {
          // Original: iterates by index 0,1,2 => [1, 2, 3], no "foo"
          // Mutated: Object.keys gives ["0","1","2","foo"] => [1, 2, 3, 99]
          expect(results).toEqual([1, 2, 3]);
          done();
        } else if (end) {
          done(end);
        } else {
          results.push(data);
          read();
        }
      });
    }

    read();
  });
});