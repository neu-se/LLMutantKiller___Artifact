import { Delta } from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should handle composition correctly', () => {
    const delta1 = new Delta().insert('Hello, ');
    const delta2 = new Delta().retain(7).insert('world!');

    const composedDelta = delta1.compose(delta2);

    expect(composedDelta.ops).toEqual([
      { insert: 'Hello, ' },
      { retain: 7 },
      { insert: 'world!' },
    ]);
  });
});