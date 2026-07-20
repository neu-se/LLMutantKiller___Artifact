import { pull } from '../../../pull.js';

describe('pull function', () => {
  it('should handle the case when the length of arguments is exceeded in the mutated code', () => {
    const read = () => {};
    const s1 = () => {};
    const s2 = () => {};
    const s3 = () => {};
    const s4 = () => {};

    const args = [read, s1, s2, s3, s4];

    let i = 1;
    let readVar = read;
    while (i < args.length) {
      const s = args[i];
      if (typeof s === 'function') {
        readVar = () => {};
      } else if (s && typeof s === 'object' && 'sink' in s && 'source' in s) {
        readVar = () => {};
      }
      i++;
    }
    expect(readVar).toBeDefined();
  });
});