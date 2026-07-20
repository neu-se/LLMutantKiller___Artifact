import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle objects correctly', () => {
    const read = () => 'read';
    const s = { source: () => 'source', sink: () => 'sink' };
    const result = pull(read, s);
    expect(result).toBe('source');
  });
});