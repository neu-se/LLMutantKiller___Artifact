import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('push()', () => {
  it('insert after retain with different attributes gets added', () => {
    const delta = new Delta();
    // First push: lastOp undefined, not object -> goes straight to push/splice
    delta.push({ retain: 2, attributes: { bold: true } });
    // Second push: lastOp IS object, attributes DON'T match (insert has no attrs)
    // In original: outer-if closes via }, then if(index===ops.length) push -> 2 ops
    // In mutant: if(false){ wraps push/splice, so second op never added -> 1 op
    delta.push({ insert: 'hello' });
    expect(delta.ops.length).toEqual(2);
    expect(delta.ops[1]).toEqual({ insert: 'hello' });
  });
});