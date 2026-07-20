const asyncMap = require('../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js');

describe('asyncMap identity function behavior', () => {
  it('should return identity function when map is null', () => {
    const result = asyncMap(null);
    expect(typeof result).toBe('function');

    const input = 42;
    const output = result(() => {})(null, (end: any, data?: any) => {
      if (!end) {
        expect(data).toBe(input);
      }
    });

    const mockRead = () => {};
    const read = result(mockRead);
    expect(read).toBeDefined();
  });
});