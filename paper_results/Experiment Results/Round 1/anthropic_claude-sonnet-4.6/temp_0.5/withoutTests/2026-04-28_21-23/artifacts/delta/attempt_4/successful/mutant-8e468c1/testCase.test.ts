import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta compose', () => {
  it('correctly composes when other starts with plain retain followed by insert and this starts with delete then insert', () => {
    const delta1 = new Delta([{ delete: 3 }, { insert: 'ABCDE' }]);
    const delta2 = new Delta().retain(5).insert('!');
    
    const result = delta1.compose(delta2);
    
    // Original produces insert before delete due to push reordering
    // The "!" should appear after "ABCDE"
    expect(result).toEqual(new Delta([{ insert: 'ABCDE!' }, { delete: 3 }]));
  });
});