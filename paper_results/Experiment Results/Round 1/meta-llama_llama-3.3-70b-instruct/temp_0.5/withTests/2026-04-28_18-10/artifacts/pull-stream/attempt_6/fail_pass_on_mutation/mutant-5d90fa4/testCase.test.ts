import values from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values';

describe('values function', () => {
  it('should return a function when given an array', (done) => {
    const array = [1, 2, 3];
    const read = values(array);
    expect(typeof read).toBe('function');
    done();
  });
});