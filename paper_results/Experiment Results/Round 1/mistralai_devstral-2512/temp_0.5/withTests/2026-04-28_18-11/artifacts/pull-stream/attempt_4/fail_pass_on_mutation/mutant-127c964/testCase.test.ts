const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('values source with null input', () => {
  it('should handle null input by immediately ending the stream', (done) => {
    const stream = values(null);
    let readCount = 0;

    stream(null, (end: any, data: any) => {
      readCount++;
      expect(end).toBe(true);
      expect(data).toBeUndefined();
      expect(readCount).toBe(1);
      done();
    });
  });
});