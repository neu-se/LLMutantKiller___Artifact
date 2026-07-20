import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle object correctly', () => {
    const read = () => 'read';
    const s = { sink: (r: any) => { throw new Error('sink should not be called') }, source: 'source' };
    expect(() => pull(read, s)).toThrowError('sink should not be called');
  });
});