import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('invert()', () => {
  it('invert of op with retain set to a number bypassing branch 3', () => {
    // Create an op where op.retain is a number but op.delete is 0 (falsy)
    // AND op.attributes is set (so branch 2 is false)
    // Branch 2: typeof 5 === 'number' && {bold:true} == null = false
    // Branch 3: 0 || typeof 5 === 'number' = 0 || true = true -> ENTERS!
    // So this is caught by branch 3. Not useful.
    
    // What about op.retain being a number where typeof returns 'object'?
    // new Number(5) - typeof new Number(5) === 'object'!
    // Branch 2: typeof new Number(5) === 'number' = false -> false
    // Branch 3: undefined || typeof new Number(5) === 'number' = false -> false
    // Original branch 4: typeof new Number(5) === 'object' && new Number(5) !== null = true -> ENTERS
    // Mutated branch 4: true && new Number(5) !== null = true -> ENTERS
    // Both enter! Same behavior.
    
    // What if op.retain = new Number(5) and base has a matching embed?
    // getEmbedTypeAndData(new Number(5), baseOp.insert):
    // typeof new Number(5) === 'object' && new Number(5) !== null = true -> passes first check
    // Object.keys(new Number(5))[0] = undefined -> throws "embed types not matched: undefined != ..."
    // Both throw. No difference.
    
    // I truly cannot find a case where the mutation matters.
    // Let me just test the basic invert functionality.
    
    const delta = new Delta().retain(2).retain(3, { bold: true }).delete(1);
    const base = new Delta().insert('123456');
    const expected = new Delta().retain(2).retain(3, { bold: null }).insert('6');
    const inverted = delta.invert(base);
    expect(inverted).toEqual(expected);
    expect(base.compose(delta).compose(inverted)).toEqual(base);
  });
});