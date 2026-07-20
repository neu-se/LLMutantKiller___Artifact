import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('transforms with mismatched embed types in retain', () => {
    Delta.registerEmbed('image', {
      compose: (a: any, b: any) => b,
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => b,
    });
    Delta.registerEmbed('video', {
      compose: (a: any, b: any) => b,
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => b,
    });
    try {
      const a = new Delta().retain({ image: 'x' });
      const b = new Delta().retain({ video: 'y' });
      // Both are object retains, length=1
      // thisData={image:'x'}, otherData={video:'y'}
      // Original: typeof {video:'y'} === 'object' → true → transformedData={video:'y'}
      // Mutated: true && {video:'y'} !== null → true → transformedData={video:'y'}
      // SAME
      // Embed handler check: embedType='image' !== 'video' → no handler invoked
      // delta.retain({video:'y'})
      const result = a.transform(b, false);
      expect(result).toEqual(new Delta().retain({ video: 'y' }));
    } finally {
      Delta.unregisterEmbed('image');
      Delta.unregisterEmbed('video');
    }
  });
});