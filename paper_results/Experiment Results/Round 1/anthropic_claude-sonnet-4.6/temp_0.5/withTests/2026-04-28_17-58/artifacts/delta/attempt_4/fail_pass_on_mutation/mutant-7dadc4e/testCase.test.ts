import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('transform number retain against object retain preserves object as transformedData', () => {
    Delta.registerEmbed<any>('delta', {
      compose: (a: any, b: any) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: any, b: any, priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: any, b: any) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().retain(1);
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const result = a.transform(b, false);
    
    Delta.unregisterEmbed('delta');
    
    expect(result).toEqual(new Delta().retain({ delta: [{ insert: 'b' }] }));
  });
});