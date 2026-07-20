import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream';

describe('find function', () => {
  it('should call the callback with the correct error when the stream ends with an error', () => {
    const err = new Error('test error');
    pull(
      pull.values([1, 2, 3]),
      pull.find((d) => d === 2, (err, data) => {
        if (err) throw err;
        expect(data).toBe(2);
      }),
      pull.error(err)
    );
  });
});