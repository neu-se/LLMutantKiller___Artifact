import OpIterator from "../src/OpIterator";
import Delta from "../src/Delta";

describe('OpIterator rest() with offset === 0', () => {
  it('returns remaining ops from current index when offset is zero', () => {
    const delta = new Delta()
      .insert('Hello', { bold: true })
      .retain(3)
      .insert({ embed: 2 }, { src: 'http://quilljs.com/' })
      .delete(4);

    const iter = new OpIterator(delta.ops);
    // Consume exactly the first op (5 chars), leaving offset === 0
    iter.next(5);

    // At this point offset === 0, so rest() should use the slice(this.index) branch
    const result = iter.rest();

    expect(result).toEqual([
      { retain: 3 },
      { insert: { embed: 2 }, attributes: { src: 'http://quilljs.com/' } },
      { delete: 4 },
    ]);
  });
});