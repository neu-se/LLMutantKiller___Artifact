import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('transform embed retain against number retain uses number length not embed as transformedData', () => {
    Delta.registerEmbed('e', {
      compose: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => b,
      invert: (a: unknown, _b: unknown) => a,
    });

    // thisOp.retain = { e: 'v' } (object), otherOp.retain = 1 (number)
    // thisData = { e: 'v' }, otherData = 1
    // typeof 1 === 'object' is false => transformedData = length in BOTH versions
    // So both produce retain(length) - same result
    // BUT: the embed handler branch: typeof thisData === 'object' && thisData !== null => true
    //   AND typeof otherData === 'object' && otherData !== null => false (number)
    //   So embed handler NOT called
    // delta.retain(length, AttributeMap.transform(...))
    const a = new Delta().retain({ e: 'v' });
    const b = new Delta().retain(1, { bold: true });

    const result = a.transform(b, false);
    // transformedData = length = 1, attributes = bold:true (no conflict since a has no attrs)
    expect(result).toEqual(new Delta().retain(1, { bold: true }));

    Delta.unregisterEmbed('e');
  });
});