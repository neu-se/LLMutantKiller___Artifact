const originalDelta = require('./Delta');
const mutatedDelta = require('./Delta');

describe('Delta', () => {
  it('should be exported correctly', () => {
    expect(originalDelta).toBeDefined();
    expect(originalDelta.exports).toBeDefined();
    expect(originalDelta.exports.default).toBeDefined();
    expect(mutatedDelta).toBeDefined();
    expect(mutatedDelta.exports).toBeDefined();
    expect(mutatedDelta.exports.default).toBeDefined();
    expect(originalDelta.exports).not.toEqual(mutatedDelta.exports);
  });
});