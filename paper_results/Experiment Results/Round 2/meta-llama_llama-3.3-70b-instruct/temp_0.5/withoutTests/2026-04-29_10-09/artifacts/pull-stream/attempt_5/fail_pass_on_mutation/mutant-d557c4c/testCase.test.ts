import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull function', () => {
  it('should handle object type correctly', () => {
    const read = () => {};
    const s = () => {};
    const obj = { sink: () => {}, source: () => {} };
    const resultOriginal = pull(read, s, obj);
    expect(resultOriginal).not.toBeNull();
    expect(resultOriginal).not.toBeUndefined();
    expect(typeof resultOriginal).toBe('function');
  });
});