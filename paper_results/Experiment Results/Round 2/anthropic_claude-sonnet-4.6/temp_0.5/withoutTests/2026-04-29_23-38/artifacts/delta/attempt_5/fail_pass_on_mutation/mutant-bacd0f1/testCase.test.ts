import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform", () => {
  it("correctly transforms retain with object embed when this has number retain producing composable result", () => {
    // Register an embed handler
    Delta.registerEmbed('image', {
      compose: (a: any, b: any, keepNull: boolean) => ({ ...a, ...b }),
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => b,
    });

    // this: retain 1 with attribute
    // other: retain {image: {src: 'url'}} (object embed)
    // In transform: thisData=1 (number), otherData={image:{src:'url'}} (object)
    // Original: typeof obj === 'object' && obj !== null => true => transformedData = {image:{src:'url'}}
    // Mutated: typeof obj === 'object' || obj !== null => true => transformedData = {image:{src:'url'}}
    // Same result for objects...

    const a = new Delta().retain(1, { bold: true });
    const b = new Delta().retain({ image: { src: 'url' } });

    const result = a.transform(b, false);
    
    Delta.unregisterEmbed('image');

    expect(result.ops).toEqual([{ retain: { image: { src: 'url' } } }]);
  });
});