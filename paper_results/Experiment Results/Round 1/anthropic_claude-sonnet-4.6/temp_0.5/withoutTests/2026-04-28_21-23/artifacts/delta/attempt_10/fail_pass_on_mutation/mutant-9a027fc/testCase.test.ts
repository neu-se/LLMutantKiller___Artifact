import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('transforms when other has object retain and this has number retain producing correct op', () => {
    Delta.registerEmbed('image', {
      compose: (a: any, b: any) => b,
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => b,
    });
    try {
      // this: retain(1) - number retain
      // other: retain({image: 'x'}) - object retain
      // length = min(1, 1) = 1
      // thisOp = {retain: 1}, otherOp = {retain: {image: 'x'}}
      // thisData = 1 (number), otherData = {image: 'x'} (object)
      // Original: typeof object === 'object' → true → transformedData = {image: 'x'}
      // Mutated: true && object !== null → true → transformedData = {image: 'x'}
      // SAME - both produce retain({image: 'x'})
      // BUT: embed handler check: typeof thisData === 'object'? NO (thisData=1)
      // So embed handler NOT invoked
      // delta.retain({image: 'x'}, AttributeMap.transform(undefined, undefined, false)) = retain({image:'x'})
      const a = new Delta().retain(1);
      const b = new Delta().retain({ image: 'x' });
      const result = a.transform(b, false);
      expect(result).toEqual(new Delta().retain({ image: 'x' }));
    } finally {
      Delta.unregisterEmbed('image');
    }
  });
});