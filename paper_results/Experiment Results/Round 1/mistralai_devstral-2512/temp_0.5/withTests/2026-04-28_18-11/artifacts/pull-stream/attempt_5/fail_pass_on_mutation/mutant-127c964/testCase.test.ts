const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values source with object input', () => {
  it('should correctly handle object input and not immediately end', (done) => {
    const input = { a: 1, b: 2, c: 3 };
    const stream = values(input);
    let firstCall = true;

    stream(null, (end: any, data: any) => {
      if (firstCall) {
        firstCall = false;
        expect(end).toBeNull();
        expect(data).toBe(1);
        // Try to read again to ensure stream doesn't end prematurely
        stream(null, (end2: any, data2: any) => {
          expect(end2).toBeNull();
          expect(data2).toBe(2);
          done();
        });
      }
    });
  });
});