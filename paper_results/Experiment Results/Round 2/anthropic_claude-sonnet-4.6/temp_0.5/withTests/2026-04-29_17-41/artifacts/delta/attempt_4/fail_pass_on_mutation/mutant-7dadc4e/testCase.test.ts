import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('transform retain number against retain embed: transformedData is the embed object not length', () => {
    Delta.registerEmbed('img', {
      compose: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => priority ? a : b,
      invert: (a: unknown, b: unknown) => a,
    });

    // thisOp.retain = 1 (number), otherOp.retain = { img: 'x' } (non-null object)
    // otherData = { img: 'x' }
    // Both original and mutated: typeof object === 'object' is true, and object !== null is true
    // So transformedData = { img: 'x' } in both cases
    // Then embed handler is NOT called (thisData is number, not object)
    // delta.retain({ img: 'x' }, ...)
    const a = new Delta().retain(1);
    const b = new Delta().retain({ img: 'x' });

    const resultWithPriority = a.transform(b, true);
    const resultWithoutPriority = a.transform(b, false);

    expect(resultWithPriority).toEqual(new Delta().retain({ img: 'x' }));
    expect(resultWithoutPriority).toEqual(new Delta().retain({ img: 'x' }));

    Delta.unregisterEmbed('img');
  });
});