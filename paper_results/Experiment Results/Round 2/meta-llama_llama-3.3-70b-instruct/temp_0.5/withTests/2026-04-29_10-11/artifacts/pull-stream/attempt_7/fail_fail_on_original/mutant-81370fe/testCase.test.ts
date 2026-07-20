import { pull } from '../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull', () => {
  it('should handle an object as an argument', () => {
    const obj = { source: () => {} };
    const s = { sink: () => {}, source: () => {} };
    const result = pull(obj, s);
    expect(result).not.toBeNull();
  });
});