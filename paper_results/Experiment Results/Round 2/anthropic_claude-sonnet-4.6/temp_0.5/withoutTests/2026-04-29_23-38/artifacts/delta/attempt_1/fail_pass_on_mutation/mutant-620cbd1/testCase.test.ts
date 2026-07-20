import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts"

describe('Delta compose optimization', () => {
  it('composes correctly when other starts with a plain retain covering inserts', () => {
    const a = new Delta().insert('hello').insert(' world');
    const b = new Delta().retain(11).insert('!');
    const composed = a.compose(b);
    expect(composed.ops).toEqual([
      { insert: 'hello world!' }
    ]);
  });
});