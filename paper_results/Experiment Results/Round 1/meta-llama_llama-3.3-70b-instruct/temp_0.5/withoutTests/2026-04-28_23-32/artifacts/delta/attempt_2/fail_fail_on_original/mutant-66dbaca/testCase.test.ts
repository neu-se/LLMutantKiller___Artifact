import { Delta } from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should be able to create a new Delta instance', () => {
    const delta = new Delta();
    expect(delta).toBeInstanceOf(Delta);
  });
});