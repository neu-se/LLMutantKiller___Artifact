import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts"

describe('Delta compose optimization with leading retain', () => {
  it('correctly composes when other starts with a plain retain and this starts with inserts', () => {
    // this has inserts, other starts with a plain retain
    const delta1 = new Delta().insert('hello').insert(' world');
    const delta2 = new Delta().retain(5).insert('!');
    
    const result = delta1.compose(delta2);
    
    // Expected: "hello!" + " world" = "hello! world"
    // The retain(5) keeps "hello", insert("!") adds "!", then " world" remains
    expect(result).toEqual(new Delta().insert('hello!').insert(' world'));
  });
});