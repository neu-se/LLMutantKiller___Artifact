import { Delta } from '../../../src/Delta';

describe('Delta', () => {
  it('should correctly compose with other delta', () => {
    const delta1 = new Delta().insert('Hello, ').retain(1, { bold: true });
    const delta2 = new Delta().retain(1, { italic: true }).insert('World!');
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops).toEqual([
      { insert: 'Hello, ' },
      { retain: 1, attributes: { bold: true, italic: true } },
      { insert: 'World!' },
    ]);
  });
});