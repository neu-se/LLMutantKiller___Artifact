import * as valuesModule from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';

describe('values', () => {
  it('should handle null input', (done) => {
    const values = valuesModule;
    const read = values(null, () => {});
    read(null, (end: any, data: any) => {
      expect(end).not.toBe(true);
      done();
    });
  });
});