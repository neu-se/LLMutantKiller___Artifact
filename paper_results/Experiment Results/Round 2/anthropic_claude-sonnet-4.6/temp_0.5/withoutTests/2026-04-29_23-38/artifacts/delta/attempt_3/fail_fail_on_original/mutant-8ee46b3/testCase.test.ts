import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should correctly transform retain ops', () => {
    const a = new Delta().retain(5);
    const b = new Delta().retain(3).insert('x').retain(2);
    const result = a.transform(b, false);
    // Original: retain(false) produces nothing, so result is [{insert: 'x'}]
    // Mutated: retain(true) produces {retain: true}, so result is [{retain: true}, {insert: 'x'}, {retain: true}]
    expect(result.ops).toEqual([{ insert: 'x' }]);
  });
});