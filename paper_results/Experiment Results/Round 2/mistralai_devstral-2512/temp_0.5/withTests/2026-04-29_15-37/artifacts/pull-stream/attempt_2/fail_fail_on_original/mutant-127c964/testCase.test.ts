import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('values with null input', () => {
  it('should handle null input correctly', (done) => {
    const read = pull.values(null);
    read(null, (end: any, data: any) => {
      expect(end).toBe(true);
      expect(data).toBeUndefined();
      done();
    });
  });
});