import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform', () => {
  it('correctly transforms when other has object retain after numeric retain', () => {
    Delta.registerEmbed('img', {
      compose: (_a: unknown, b: unknown) => b,
      invert: (_a: unknown, b: unknown) => b,
      transform: (_a: unknown, b: unknown, _priority: boolean) => b,
    });

    // thisOp: numeric retain(1)
    // otherOp: object retain {img: ...}
    // length = min(1, 1) = 1
    // otherData = {img: ...} (object, not null)
    // Original: true && true = true -> transformedData = otherData
    // Mutated:  true || true = true -> transformedData = otherData
    // Same result - embed handler runs since both thisData and otherData... wait
    // thisData = thisOp.retain = 1 (number), otherData = {img:...} (object)
    // embed handler block: typeof thisData === 'object' && thisData !== null = false -> skip
    // transformedData stays as otherData = {img:...}
    // delta.retain({img:...}) - correct
    
    const a = new Delta().retain(1);
    const b = new Delta().retain({ img: { src: 'test.png' } });

    const result = a.transform(b, false);
    expect(result.ops).toEqual([{ retain: { img: { src: 'test.png' } } }]);

    Delta.unregisterEmbed('img');
  });
});