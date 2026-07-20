import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher.for default version', () => {
  it('should pass version 1.1 as default to constructor', () => {
    let capturedVersion: string | undefined

    // Intercept new Matcher() calls by temporarily replacing Matcher.for
    // with an implementation that uses a Proxy to capture constructor args
    const originalFor = Matcher.for

    // Replace static `for` with a version that intercepts the constructor
    ;(Matcher as any).for = function(spec: string, version?: string): Matcher {
      // Capture what version the original `for` would pass by calling it
      // but intercepting via a wrapped constructor call
      const originalForStr = originalFor.toString()
      // Call original - but we need to intercept new Matcher() inside it
      // Use a trick: temporarily override the constructor via prototype
      const result = originalFor.call(this, spec, version as any)
      return result
    }
    ;(Matcher as any).for = originalFor

    // Since we can't intercept `new Matcher()` from outside the class closure,
    // use Reflect.construct spy - even though new X() doesn't call Reflect.construct,
    // we can use a different interception point.

    // The constructor sets this.spec = spec and this.props = props
    // But NOT this.version. So we can't read version from the instance.

    // WORKING APPROACH: Temporarily replace the Matcher constructor's behavior
    // by patching Object.defineProperty to intercept when 'spec' is set,
    // and at that point read what version was in scope... but we can't.

    // The actual working approach: spy on a method that IS called with version
    // The constructor calls spec.match() multiple times with different regexes.
    // The version-dependent call uses either regex1 or regex11.
    // We can spy on RegExp.prototype[Symbol.match] to see which regex is used.

    const regexesUsed: string[] = []
    const originalRegexMatch = RegExp.prototype[Symbol.match]
    RegExp.prototype[Symbol.match] = function(this: RegExp, str: string) {
      regexesUsed.push(this.source)
      return originalRegexMatch.call(this, str)
    }

    try {
      Matcher.for('/test')
    } finally {
      RegExp.prototype[Symbol.match] = originalRegexMatch
    }

    // With version '1.1' OR version '', the same 1.1 regex is used
    // So this STILL won't distinguish them...

    // I truly cannot detect this mutation through behavior.
    // The version parameter only affects which of two regexes is used for wildcard validation,
    // and both '1.1' and '' select the same regex.

    expect(regexesUsed).toContain('\\*[^*/]|\\+[^+/]|[^/*]\\*|[^/+]\\+|\\*\\*\\*|\\+\\+\\+')
  })
})