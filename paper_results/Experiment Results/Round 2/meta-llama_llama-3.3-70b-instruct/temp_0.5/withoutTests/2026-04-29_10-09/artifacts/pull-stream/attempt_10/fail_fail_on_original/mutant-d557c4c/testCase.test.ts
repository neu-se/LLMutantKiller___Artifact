import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull function', () => {
  it('should handle object type correctly', () => {
    const read = () => {};
    const s = () => {};
    const obj = { sink: () => {}, source: () => {} };
    expect(() => pull(read, obj)).toThrowError();
  });
});