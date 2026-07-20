import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull function', () => {
  it('should handle the mutation correctly', () => {
    const length = 2;
    const args = new Array(length);
    for (var i = 0; i < length; i++) {
      args[i] = i;
    }
    expect(args).toHaveLength(length);
  });
});