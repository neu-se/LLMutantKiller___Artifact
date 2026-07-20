import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('transforms when this has object retain and other has number retain with different lengths', () => {
    Delta.registerEmbed('image', {
      compose: (a: any, b: any) => b,
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => b,
    });
    try {
      // this: retain({image:'x'}) length=1, then retain(2) length=2
      // other: retain(3, {bold:true}) length=3
      // Iteration 1: length=min(1,3)=1
      //   thisOp={retain:{image:'x'}}, otherOp={retain:1, bold}
      //   thisData={image:'x'} (object), otherData=1 (number)
      //   Original: typeof 1 === 'object' → false → transformedData = length = 1
      //   Mutated: true && 1 !== null → true → transformedData = otherData = 1
      //   SAME (both = 1)
      const a = new Delta().retain({ image: 'x' }).retain(2);
      const b = new Delta().retain(3, { bold: true });
      const result = a.transform(b, false);
      expect(result).toEqual(new Delta().retain(3, { bold: true }));
    } finally {
      Delta.unregisterEmbed('image');
    }
  });
});