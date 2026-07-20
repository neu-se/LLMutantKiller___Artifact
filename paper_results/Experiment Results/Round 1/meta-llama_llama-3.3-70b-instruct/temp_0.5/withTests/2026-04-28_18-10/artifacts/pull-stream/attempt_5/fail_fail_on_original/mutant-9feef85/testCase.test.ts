import * as pull from '../';

describe('values', () => {
  it('should handle null input', (done) => {
    const read = pull.values(null, () => {});
    read(null, (end: any, data: any) => {
      expect(end).toBe(true);
      done();
    });
  });
});