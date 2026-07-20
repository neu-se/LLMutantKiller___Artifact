import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle objects and functions correctly', () => {
    const read = () => 'read';
    const s = { source: () => 'source' };
    const result = pull(read, s);
    expect(result).toBe('source');
    const t = () => 't';
    expect(pull(read, t)).toBe('t');
    const u = {};
    expect(() => pull(read, u)).toThrowError();
  });
});