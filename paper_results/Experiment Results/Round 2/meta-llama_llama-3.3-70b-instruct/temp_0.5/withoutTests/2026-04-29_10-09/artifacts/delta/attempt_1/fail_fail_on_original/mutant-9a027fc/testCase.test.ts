import { Delta } from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should transform correctly', () => {
    const delta1 = new Delta();
    delta1.insert('Hello, ', { bold: true });
    delta1.insert('world!', { italic: true });

    const delta2 = new Delta();
    delta2.insert('Hello, ', { bold: true });
    delta2.insert('earth!', { italic: true });

    const transformedDelta = delta1.transform(delta2, true);
    expect(transformedDelta.length()).toBe(13);
    expect(transformedDelta.ops[0].insert).toBe('Hello, ');
    expect(transformedDelta.ops[0].attributes).toEqual({ bold: true });
    expect(transformedDelta.ops[1].insert).toBe('earth!');
    expect(transformedDelta.ops[1].attributes).toEqual({ italic: true });
  });
});