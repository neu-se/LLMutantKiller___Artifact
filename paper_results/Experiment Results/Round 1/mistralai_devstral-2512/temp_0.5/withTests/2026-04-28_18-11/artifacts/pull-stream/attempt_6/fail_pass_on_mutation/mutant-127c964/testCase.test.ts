const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values source with object input', () => {
  it('should not immediately end when given an object', (done) => {
    const input = { a: 1, b: 2, c: 3 };
    const stream = values(input);

    // First read should return first value
    stream(null, (end: any, data: any) => {
      expect(end).toBeNull();
      expect(data).toBe(1);

      // Second read should return second value (not end)
      stream(null, (end2: any, data2: any) => {
        expect(end2).toBeNull();
        expect(data2).toBe(2);
        done();
      });
    });
  });
});