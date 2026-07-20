import { pull } from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull function', () => {
  it('should create an array of the correct length when used as a partial application', () => {
    const partial = pull(function (a) { return a });
    expect(partial.length).toBe(1);
    const partialWithArgs = partial;
    expect(partialWithArgs.length).toBe(1);
    const args = [function (a) { return a }, function (a) { return a }, function (a) { return a }];
    const partialWithMultipleArgs = pull.apply(null, [function (a) { return a }].concat(args));
    expect(partialWithMultipleArgs.length).toBe(1);
  })
})