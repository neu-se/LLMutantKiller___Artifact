import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Op.length with object retain in compose', () => {
  it('compose correctly handles two consecutive object retain ops', () => {
    const a = new Delta().retain({ figure: true }).retain({ table: true });
    const b = new Delta().retain(1).insert('X').retain(1);
    const result = a.compose(b);
    expect(result.ops.length).toEqual(3);
    expect(result.ops[0]).toEqual({ retain: { figure: true } });
    expect(result.ops[1]).toEqual({ insert: 'X' });
    expect(result.ops[2]).toEqual({ retain: { table: true } });
  });
});