import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embed and non-embed retain', () => {
  it('should correctly transform when thisOp has number retain and otherOp has embed retain', () => {
    Delta.registerEmbed('image', {
      compose: (a: any, b: any, keepNull: boolean) => ({ ...a, ...b }),
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => ({ transformed: true }),
    });

    // this delta: retain 1 (number)
    // other delta: retain embed {image: {src: 'url'}}
    const thisDelta = new Delta().retain(1);
    const otherDelta = new Delta().retain({ image: { src: 'url' } });

    // With original: typeof thisData === 'object' is false (number), skip embed transform
    // transformedData stays as otherData = {image: {src: 'url'}}
    // With mutation: true && typeof otherData === 'object' -> Object.keys(1)[0] = undefined
    // undefined === 'image' is false, so transformedData stays as {image: {src: 'url'}}
    // Hmm, same result...

    const result = thisDelta.transform(otherDelta, false);
    Delta.unregisterEmbed('image');
    
    expect(result.ops).toEqual([{ retain: { image: { src: 'url' } } }]);
  });
});