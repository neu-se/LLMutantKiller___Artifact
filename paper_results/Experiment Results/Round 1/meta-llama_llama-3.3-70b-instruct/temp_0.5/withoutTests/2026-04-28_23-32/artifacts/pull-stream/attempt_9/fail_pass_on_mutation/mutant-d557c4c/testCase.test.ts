import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle objects and functions correctly', () => {
    const read = () => 'read';
    const s = () => 's';
    const result = pull(read, s);
    expect(typeof result).toBe('string');
    const t = {};
    expect(() => pull(read, t)).toThrowError(TypeError);
  });
});