import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('push()', () => {
  it('push op into empty delta adds the op', () => {
    const delta = new Delta();
    // lastOp is undefined (not an object), so in the mutant the push/splice
    // block is inside if(typeof lastOp === 'object') which is false,
    // meaning the op never gets added in the mutant
    delta.push({ insert: 'hello' });
    expect(delta.ops.length).toEqual(1);
  });
});