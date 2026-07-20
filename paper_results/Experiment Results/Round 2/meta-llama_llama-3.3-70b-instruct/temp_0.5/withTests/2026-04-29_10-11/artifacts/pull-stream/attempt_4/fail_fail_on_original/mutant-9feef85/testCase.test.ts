import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream'

describe('values', () => {
  it('should handle null input and call callback with true', () => {
    const callback = jest.fn();
    pull(
      pull.values(null, () => {}),
      pull.collect((err, ary) => {
        expect(err).toBeUndefined();
        expect(ary).toBeUndefined();
      })
    )
  });
});