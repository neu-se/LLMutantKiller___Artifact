import { pull } from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull', () => {
  it('should call the source function when read has a source property', () => {
    const sourceSpy = jest.fn();
    const read = { source: sourceSpy };
    pull(read);
    expect(sourceSpy).toHaveBeenCalledTimes(1);
  });
});