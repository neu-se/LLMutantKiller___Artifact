import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle retain operations in invert method', () => {
    const baseDelta = new Delta();
    baseDelta.insert('Test');
    const delta = new Delta();
    delta.retain(1);
    const invertedDelta = delta.invert(baseDelta);
    expect(invertedDelta.ops).toEqual([{ delete: 1 }]);
    const baseDelta2 = new Delta();
    baseDelta2.insert('Test');
    const delta2 = new Delta();
    delta2.retain(1);
    const invertedDelta2 = delta2.invert(baseDelta2);
    expect(invertedDelta2.ops).toEqual([{ delete: 1 }]);
    const baseDelta3 = new Delta();
    baseDelta3.insert('Test');
    const delta3 = new Delta();
    delta3.retain(1);
    const invertedDelta3 = delta3.invert(baseDelta3);
    expect(invertedDelta3.ops).toEqual([{ delete: 1 }]);
    const baseDelta4 = new Delta();
    baseDelta4.insert('Test');
    const delta4 = new Delta();
    delta4.retain(null);
    expect(() => delta4.invert(baseDelta4)).toThrowError('no handlers for embed type "null"');
  });
});