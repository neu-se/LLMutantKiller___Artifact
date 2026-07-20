import { pull } from '../../../pull';

describe('pull function', () => {
  it('should handle object as a sink', () => {
    const read = () => ({ end: true });
    const obj = { sink: (s: any) => { s({ end: true }) }, source: () => {} };
    const result = pull(read, obj);
    expect(result).not.toBeNull();
    expect(typeof result).toBe('function');
  });
});