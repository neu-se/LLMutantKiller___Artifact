import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should preserve inserts from this delta when other starts with a retain', () => {
    const delta1 = new Delta().insert('Hello').insert(' World');
    const delta2 = new Delta().retain(11).insert('!');
    const result = delta1.compose(delta2);
    expect(result).toEqual(new Delta().insert('Hello World!'));
  });
});