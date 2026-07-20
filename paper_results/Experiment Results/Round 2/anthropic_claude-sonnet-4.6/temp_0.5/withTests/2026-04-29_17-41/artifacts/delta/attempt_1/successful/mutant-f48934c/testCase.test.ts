import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('insert() with embed having length property of 0', () => {
  it('should insert an object embed even when the object has a length property of 0', () => {
    const delta = new Delta().insert({ video: 'http://example.com' });
    // The original code only skips empty strings (typeof arg === 'string' && arg.length === 0)
    // The mutated code uses (true && arg.length === 0), which would skip objects with length === 0
    // An object without a length property has length === undefined, not 0
    // But we need an object where length === 0 to expose the mutation
    const deltaWithLength = new Delta().insert({ length: 0, type: 'embed' } as any);
    expect(deltaWithLength.ops.length).toEqual(1);
    expect(deltaWithLength.ops[0]).toEqual({ insert: { length: 0, type: 'embed' } });
  });
});