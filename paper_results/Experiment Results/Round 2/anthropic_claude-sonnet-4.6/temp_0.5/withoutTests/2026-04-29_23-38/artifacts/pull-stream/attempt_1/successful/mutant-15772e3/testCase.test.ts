import filter from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js";

describe("filter through - async source with filtered items", () => {
  it("should correctly pass filtered items through an async source", (done) => {
    // Create an async source that yields items one at a time asynchronously
    const items = [1, 2, 3, 4, 5];
    let index = 0;

    const asyncSource = (_end: any, cb: (end: any, data?: any) => void) => {
      if (index >= items.length) {
        cb(true); // end of stream
        return;
      }
      const item = items[index++];
      // Make it async by using setImmediate
      setImmediate(() => {
        cb(null, item);
      });
    };

    // Filter to only allow even numbers
    const filteredSource = filter((x: number) => x % 2 === 0)(asyncSource);

    const results: number[] = [];

    function drain(end: any, data?: any) {
      if (end === true) {
        // Stream ended - check results
        expect(results).toEqual([2, 4]);
        done();
        return;
      }
      if (end) {
        done(end);
        return;
      }
      results.push(data);
      filteredSource(null, drain);
    }

    filteredSource(null, drain);
  });
});