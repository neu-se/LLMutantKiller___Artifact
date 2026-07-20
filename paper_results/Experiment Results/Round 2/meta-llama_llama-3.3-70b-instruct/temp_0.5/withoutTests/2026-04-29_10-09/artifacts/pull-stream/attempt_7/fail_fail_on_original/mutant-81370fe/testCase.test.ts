import { pull } from '../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull function', () => {
  it('should handle object as a sink', () => {
    const read = () => ({ end: true });
    const sink = (s: any) => { s({ end: true }) };
    const result = pull(read, sink);
    expect(result).not.toBeNull();
  });
});