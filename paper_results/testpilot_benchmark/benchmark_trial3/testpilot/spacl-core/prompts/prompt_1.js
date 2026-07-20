Your task is to write a test for the following function:
```
class @spacl/core.Matcher(spec, version = '1.1')
```

This function is defined as follows:
```
class Matcher extends RegExp {
    /** @param spec Path specification.
      * @param version Specification language version. */
    constructor(spec, version = '1.1') {
        if (spec.match(/^[a-zA-Z0-9_/:~.$+*-]*$/) === null) {
            throw new Error('Path contains invalid characters');
        }
        if (spec.match(/^\//) === null) {
            throw new Error('Path must begin with a slash');
        }
        if (spec.match(/\/\//) !== null) {
            throw new Error('Path contains empty segments');
        }
        if (spec.match(version === '1' || version === '1.0'
            ? /[*+][^/]|[^/][*+]/
            : /\*[^*/]|\+[^+/]|[^/*]\*|[^/+]\+|\*\*\*|\+\+\+/) !== null) {
            throw new Error('Path contains malformed wildcards');
        }
        if (spec.match(/[^/]:|:\/|:$/) !== null) {
            throw new Error('Path contains malformed captures');
        }
        if (spec.match(/^.+\/$/) !== null) {
            throw new Error('Path must not end with a slash');
        }
        const { regex, props } = compile(spec);
        super(regex);
        this.spec = spec;
        this.props = props;
    }
    [Symbol.match](string) {
        if (string.length > 1 && string.endsWith('/')) {
            return null;
        }
        return super[Symbol.match](string);
    }
    /** Static constructor function; returns a new Matcher.
      * @param spec Path specification.
      * @param version Specification language version. */
    static for(spec, version = '1.1') {
        return new Matcher(spec, version);
    }
}
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');
describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.