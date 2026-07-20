import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('compiles a path spec with a capture segment to the correct regex source', () => {
    // /:foo should compile to the same as what itCompiles tests show
    const m = Matcher.for('/:foo')
    // Based on itCompiles tests for capture segments:
    // ['/:foo', /^\/([^/]+)$/]
    expect(m.source).toBe('^\\/([^/]+)$')
    expect(m.props).toEqual(['foo'])
  })
})