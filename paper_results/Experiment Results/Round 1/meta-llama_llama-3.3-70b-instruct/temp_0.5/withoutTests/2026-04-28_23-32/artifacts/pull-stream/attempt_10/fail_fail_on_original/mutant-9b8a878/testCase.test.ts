import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull function', () => {
  it('should throw an error when creating a partial application with an empty array', () => {
    const partial = pull(function (a: any) { return a });
    expect(() => partial.apply(null, [])).toThrowError();
  })
})