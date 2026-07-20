import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('object retain followed by delete in other delta pushes the delete', () => {
    Delta.registerEmbed('image', {
      compose: (a: any, b: any) => ({ ...a, ...b }),
      invert: (a: any, b: any) => a,
      transform: (a: any, b: any, priority: boolean) => b,
    });
    
    try {
      // thisOp is an object retain, otherOp is a delete
      // Original: condition true (non-null object) -> delete pushed
      // Mutated: condition true (true replaces !== null) -> delete pushed
      // Same behavior for non-null objects
      
      // The only difference is for null retain, which can't happen through normal API
      // Let's test with a scenario that exercises the exact code path
      const a = new Delta().retain({ image: { src: 'test.png' } });
      const b = new Delta().delete(1);
      const expected = new Delta().delete(1);
      expect(a.compose(b)).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('image');
    }
  });
});