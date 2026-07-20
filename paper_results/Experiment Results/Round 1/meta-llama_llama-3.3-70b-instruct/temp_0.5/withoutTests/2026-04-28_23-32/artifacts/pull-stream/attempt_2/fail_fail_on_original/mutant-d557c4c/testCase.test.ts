import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle functions correctly', () => {
    const read = () => 'read';
    const s = () => 's';
    const result = pull(read, s);
    expect(typeof result).toBe('function');
  });
});