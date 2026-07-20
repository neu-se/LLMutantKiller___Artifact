import { map } from '../../../../../../../../subject_repositories/pull-stream/throughs/map.js';

describe('map function', () => {
  it('should return the identity function if no mapper is provided', () => {
    const mapper = undefined;
    const result = map(mapper);
    expect(result).toBeInstanceOf(Function);
  });
});