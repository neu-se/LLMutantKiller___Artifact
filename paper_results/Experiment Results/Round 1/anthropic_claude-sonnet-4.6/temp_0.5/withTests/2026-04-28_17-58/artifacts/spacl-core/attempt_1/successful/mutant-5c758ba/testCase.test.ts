import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"
import { describe, it, expect } from "@jest/globals"

describe('Matcher trailing slash validation', () => {
  it('throws an error with the message "Path must not end with a slash" when spec ends with a slash', () => {
    expect(() => {
      new Matcher('/foo/')
    }).toThrow('Path must not end with a slash')
  })
})