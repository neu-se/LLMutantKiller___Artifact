import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('composition with null retain and delete', () => {
    // Create ops directly to bypass retain() method guard
    const a = new Delta([{ retain: null as any }, { insert: 'hello' }]);
    const b = new Delta([{ delete: 1 }, { retain: 5 }]);
    // If null retain + delete cancels (original): result is insert('hello')
    // If null retain + delete keeps delete (mutated): result is delete(1) + insert('hello')  
    const result = a.compose(b);
    expect(result).toEqual(new Delta().insert('hello'));
  });
});