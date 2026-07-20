import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull function', () => {
  it('should throw an error when args array is empty', () => {
    const partial = pull(function (a: any) { return a });
    const args = [];
    expect(() => pull.apply(null, [function (a: any) { return a }].concat(args))).toThrowError();
  })
})