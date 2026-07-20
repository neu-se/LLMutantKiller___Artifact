import { AttributeMap } from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts';

describe('AttributeMap compose', () => {
  it('should correctly compose attribute maps', () => {
    const a = { a: 1, b: 2 };
    const b = { b: null, c: 3 };
    const result = AttributeMap.compose(a, b);
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it('should fail when mutation is present', () => {
    // Simulate the mutation by modifying the compose function
    const originalCompose = AttributeMap.compose;
    AttributeMap.compose = (a, b, keepNull) => {
      if (true && b['b'] === undefined) {
        a['b'] = b['b'];
      }
      return originalCompose(a, b, keepNull);
    };

    const a = { a: 1, b: 2 };
    const b = { b: null, c: 3 };
    const result = AttributeMap.compose(a, b);
    expect(result).not.toEqual({ a: 1, c: 3 });

    // Restore the original compose function
    AttributeMap.compose = originalCompose;
  });
});