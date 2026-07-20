import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should transform embed retain correctly', () => {
    Delta.registerEmbed('image', {
      compose: (a: any, b: any, keepNull: boolean) => ({ ...a, ...b }),
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => ({ ...b }),
    });

    // Both thisOp and otherOp have object (embed) retains
    // thisData = {image: {src: 'a'}}, otherData = {image: {src: 'b'}}
    // typeof otherData === 'object' && otherData !== null => true => transformedData = otherData
    // The embed handler.transform is called
    const thisDelta = new Delta([{ retain: { image: { src: 'a.png' } } }]);
    const otherDelta = new Delta([{ retain: { image: { src: 'b.png' } } }]);
    
    const result = thisDelta.transform(otherDelta, false);
    expect(result.ops[0]?.retain).toEqual({ image: { src: 'b.png' } });
    
    Delta.unregisterEmbed('image');
  });
});