const filter = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js");

describe("filter mutation test", () => {
  it("should correctly handle synchronous filtering", (done) => {
    const input = [1, 2, 3, 4, 5];
    const expectedOutput = [1, 3, 5];
    const results: number[] = [];

    let callIndex = 0;
    const read = (end: any, cb: (end: any, data?: any) => void) => {
      if (callIndex >= input.length) {
        cb(true);
        return;
      }
      const data = input[callIndex++];
      cb(null, data);
    };

    const filteredRead = filter((data: number) => data % 2 !== 0)(read);

    filteredRead(null, (end: any, data?: any) => {
      if (end) {
        expect(results).toEqual(expectedOutput);
        done();
      } else if (data !== undefined) {
        results.push(data);
      }
    });
  });
});