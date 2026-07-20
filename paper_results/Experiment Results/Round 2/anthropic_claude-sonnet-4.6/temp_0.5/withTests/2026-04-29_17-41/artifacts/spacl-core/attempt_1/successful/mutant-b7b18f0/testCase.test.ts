import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"
import { describe, it, expect } from "@jest/globals"

describe('Matcher malformed wildcards error message', () => {
  it('throws an error with the message "Path contains malformed wildcards" for paths with malformed wildcards', () => {
    expect(() => Matcher.for('/foo+')).toThrow('Path contains malformed wildcards')
  })
})