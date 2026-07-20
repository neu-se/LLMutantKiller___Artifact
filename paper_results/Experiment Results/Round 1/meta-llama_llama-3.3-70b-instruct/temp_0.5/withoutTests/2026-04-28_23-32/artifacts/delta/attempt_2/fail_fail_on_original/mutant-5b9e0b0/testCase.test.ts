import { Delta } from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta', () => {
  it('should compose correctly when retain is null', () => {
    const delta1 = new Delta();
    delta1.insert('Hello, ', { bold: true });
    const delta2 = new Delta();
    delta2.insert('world!', { bold: true });
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops.length).toBe(1);
    expect(composedDelta.ops[0].insert).toBe('Hello, world!');
    expect(composedDelta.ops[0].attributes).toEqual({ bold: true });
  });
});