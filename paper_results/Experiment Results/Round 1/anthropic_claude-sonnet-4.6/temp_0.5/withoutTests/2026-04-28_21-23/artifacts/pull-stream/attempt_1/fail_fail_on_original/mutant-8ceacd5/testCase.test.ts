import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull with 5+ arguments (partial sink default case)", () => {
  it("should correctly pipe through 5 pipeline stages", (done) => {
    // Create a source that produces values 1, 2, 3
    const source = (end: any, cb: Function) => {
      let i = 0;
      const values = [1, 2, 3];
      if (end) return cb(end);
      if (i >= values.length) return cb(true);
      // We need a stateful source
    };

    // Use a simpler approach with through streams
    const results: number[] = [];
    
    // Simple through function that adds 1
    const addOne = (read: Function) => (end: any, cb: Function) => {
      read(end, (end: any, data: number) => {
        if (end) return cb(end);
        cb(null, data + 1);
      });
    };

    // Simple values source
    let i = 0;
    const values = [1, 2, 3];
    const simpleSource = (end: any, cb: Function) => {
      if (end) return cb(end);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    };

    // Sink that collects results
    const collect = (read: Function) => {
      read(null, function next(end: any, data: number) {
        if (end === true) {
          expect(results).toEqual([6, 7, 8]);
          done();
          return;
        }
        if (end) { done(end); return; }
        results.push(data);
        read(null, next);
      });
    };

    // Use 5 arguments: source + 3 through + sink = 5 total
    pull(simpleSource, addOne, addOne, addOne, collect);
  });
});