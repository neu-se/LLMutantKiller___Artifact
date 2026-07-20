import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts"

describe('Delta compose', () => {
  it('correctly composes when other starts with plain retain and this starts with a delete', () => {
    // this: delete 3 chars, then insert "hello"
    // other: retain 5 (keep 5 chars)
    // Expected: applying other to the result of this
    // this deletes 3 chars from base, inserts "hello" (net: 5 chars of content)
    // other retains 5 of those chars -> result should be same as this
    const delta1 = new Delta([{ delete: 3 }, { insert: 'hello' }]);
    const delta2 = new Delta().retain(5);
    
    const result = delta1.compose(delta2);
    
    // Composing with a trailing retain that covers all content should give same as delta1 (after chop)
    expect(result).toEqual(new Delta([{ delete: 3 }, { insert: 'hello' }]));
  });
});