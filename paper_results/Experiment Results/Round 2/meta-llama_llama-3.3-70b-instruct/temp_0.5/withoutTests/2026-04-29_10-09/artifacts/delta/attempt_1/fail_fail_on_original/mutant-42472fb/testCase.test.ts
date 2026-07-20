import { Delta } from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta', () => {
  it('should correctly compose deltas with leading retain', () => {
    const delta1 = new Delta().retain(5);
    const delta2 = new Delta().insert('Hello, World!');
    const composed = delta1.compose(delta2);
    expect(composed.ops).toEqual([
      { retain: 5 },
      { insert: 'Hello, World!' },
    ]);
  });
});