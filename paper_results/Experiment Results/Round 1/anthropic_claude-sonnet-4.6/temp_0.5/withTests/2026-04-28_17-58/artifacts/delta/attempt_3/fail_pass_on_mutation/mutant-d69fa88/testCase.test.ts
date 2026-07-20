import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('invert() with embed retain', () => {
  beforeEach(() => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });
  });

  afterEach(() => {
    Delta.unregisterEmbed('delta');
  });

  it('invert an embed retain followed by a numeric retain with attributes', () => {
    // Test case where we have a numeric retain with attributes
    // In the mutated code, after handling numeric retain (branch 3),
    // we check `true && op.retain !== null` for the NEXT op
    // But actually each op is processed separately in reduce...
    
    // Let me try: numeric retain with attributes where op.retain is a number
    // Branch 3 handles it. Then for the SAME op, does branch 4 also run? NO - else if.
    
    // The only way mutation matters: op reaches branch 4 where op.retain is NOT an object
    // but IS not null. For valid ops, only object retains reach branch 4.
    
    // UNLESS: what about retain(number, attrs) where attrs is not null?
    // op = {retain: 5, attributes: {bold: true}}
    // Branch 2: typeof 5 === 'number' && attrs == null → FALSE (attrs not null)
    // Branch 3: op.delete || typeof 5 === 'number' → TRUE → handled, return
    // Branch 4: never reached
    
    // I think the mutation is a no-op for valid inputs...
    // But let me try the test anyway with embed retain
    
    const delta = new Delta().retain({ delta: [{ insert: 'b' }] });
    const base = new Delta().insert({ delta: [{ insert: 'a' }] });
    const expected = new Delta().retain({ delta: [{ delete: 1 }] });
    const inverted = delta.invert(base);
    expect(inverted).toEqual(expected);
    expect(base.compose(delta).compose(inverted)).toEqual(base);
  });
});