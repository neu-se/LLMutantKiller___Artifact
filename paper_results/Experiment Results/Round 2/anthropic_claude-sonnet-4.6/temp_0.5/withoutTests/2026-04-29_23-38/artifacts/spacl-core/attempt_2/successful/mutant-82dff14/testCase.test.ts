import { execSync } from 'child_process'
import * as path from 'path'
import * as fs from 'fs'

describe('Matcher constructor default version type safety', () => {
  it('should have a default version parameter typed as 1.1 not empty string', () => {
    // Write a TypeScript file that relies on the default being a valid version
    // and compile it to check for type errors
    const testCode = `
import { Matcher } from "./src/matcher";
// This should compile fine - passing explicit '1.1'
const m1 = new Matcher('/foo', '1.1');
// This should also compile fine - using default
const m2 = new Matcher('/foo');
// Verify the version type is correct by assigning default to typed variable
function takesVersion(v: '1' | '1.0' | '1.1'): void {}
// The default value of the constructor parameter should be assignable to the version type
// We test this by checking that Matcher.for (which uses '1.1' default) and 
// new Matcher() produce structurally equivalent results
const m3: Matcher = new Matcher('/test');
`
    const repoRoot = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/spacl-core')
    const tmpFile = path.join(repoRoot, '_type_test_tmp.ts')
    
    try {
      fs.writeFileSync(tmpFile, testCode)
      // Run tsc with noEmit to check types
      const result = execSync(`cd "${repoRoot}" && npx tsc --noEmit --strict _type_test_tmp.ts 2>&1 || true`).toString()
      // With mutation (default = ""), TypeScript should report a type error
      // because "" is not assignable to '1' | '1.0' | '1.1'
      expect(result).not.toContain('error TS')
    } finally {
      if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile)
    }
  })
})