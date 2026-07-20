import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('root path should match only root', () => {
    const m = new Matcher('/')
    expect('/'.match(m)).not.toBeNull()
    expect('/foo'.match(m)).toBeNull()
  })
})