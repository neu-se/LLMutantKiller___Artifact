const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values source with object input', () => {
  it('should process object values correctly and not end immediately', (done) => {
    const input = { a: 1, b: 2, c: 3 };
    const stream = values(input);
    let callCount = 0;

    stream(null, (end: any, data: any) => {
      callCount++;
      if (callCount === 1) {
        expect(end).toBeNull();
        expect(data).toBe(1);
        // Schedule next read
        setImmediate(() => {
          stream(null, (end2: any, data2: any) => {
            callCount++;
            expect(end2).toBeNull();
            expect(data2).toBe(2);
            done();
          });
        });
      }
    });
  });
});