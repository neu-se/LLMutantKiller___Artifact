import map from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/map.js";

describe("map with no mapper argument", () => {
  it("should act as identity function when called with no argument (falsy mapper)", (done) => {
    const inputData = [1, 2, 3, 4, 5];
    const results: number[] = [];

    // Create a simple source from an array
    const values = inputData.slice();
    let i = 0;
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    };

    // Apply map with no argument (undefined/falsy mapper)
    // In original code: if(!mapper) return id, so data passes through unchanged
    // In mutated code: if(false) return id, so it tries to use prop(undefined) as mapper
    const through = map(undefined);
    const read = through(source);

    const drain = () => {
      read(null, (end: any, data: any) => {
        if (end === true) {
          // Stream ended normally
          expect(results).toEqual(inputData);
          done();
          return;
        }
        if (end) {
          // Error occurred - this would happen in mutated code
          done(end);
          return;
        }
        results.push(data);
        drain();
      });
    };

    drain();
  });
});