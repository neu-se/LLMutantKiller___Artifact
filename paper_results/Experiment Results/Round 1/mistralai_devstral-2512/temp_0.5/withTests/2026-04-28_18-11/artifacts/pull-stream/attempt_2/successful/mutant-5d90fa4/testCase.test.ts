import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/index.js";

describe('values with null input', () => {
  it('should handle null input gracefully', (done) => {
    const read = pull.values(null);
    read(null, (end: any, data: any) => {
      expect(end).toBe(true);
      expect(data).toBeUndefined();
      done();
    });
  });
});