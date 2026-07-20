import { values } from '../../../../../../../../../../../../subject_repositories/pull-stream/sources/values';

describe('values', () => {
  it('should return values when input is an array', () => {
    const array = [1, 2, 3];
    const result = values(array);
    let called = false;
    result(null, (err: any, data: any) => {
      called = true;
      expect(err).toBeNull();
      expect(data).toBe(1);
    });
    expect(called).toBe(true);
  });
});