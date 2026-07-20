import values from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values';

describe('values function', () => {
  it('should call the callback with true when given null', (done) => {
    const read = values(null);
    read(null, (end: any) => {
      expect(end).toBe(true);
      done();
    });
  });
});