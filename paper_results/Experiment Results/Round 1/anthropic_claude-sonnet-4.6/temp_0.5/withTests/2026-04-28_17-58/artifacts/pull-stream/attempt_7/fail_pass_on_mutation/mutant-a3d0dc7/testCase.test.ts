import values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe("values source", () => {
  it("should emit all values from array before ending", (done) => {
    const read = values([1, 2, 3]);
    const collected: number[] = [];

    function drain(err: any, data: any) {
      if (err === true) {
        // Stream ended naturally
        expect(collected).toEqual([1, 2, 3]);
        done();
        return;
      }
      if (err) throw err;
      collected.push(data);
      read(null, drain);
    }

    read(null, drain);
  });
});