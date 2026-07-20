import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose', () => {
  it('should correctly compose when other starts with an insert (not a retain)', () => {
    // this has an insert
    const delta1 = new Delta().insert('Hello');
    // other starts with an insert (not a retain)
    const delta2 = new Delta().insert('World');
    
    const result = delta1.compose(delta2);
    
    // Expected: 'World' inserted before 'Hello'
    // The result should be WorldHello
    expect(result.ops).toEqual([{ insert: 'WorldHello' }]);
  });
});