import { pull } from '../../pull.js';

describe('pull function', () => {
  it('should handle object as a sink', () => {
    const read = () => {};
    const sink = { sink: () => {}, source: () => {} };
    const result = pull(read, sink);
    expect(result).not.toBeNull();
  });
});