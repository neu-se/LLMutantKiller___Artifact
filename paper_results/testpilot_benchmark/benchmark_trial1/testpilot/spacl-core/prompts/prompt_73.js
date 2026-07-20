Your task is to write a test for the following function:
```
class @spacl/core.Policy(name, ...rules)
```

This function is defined as follows:
```
class Policy {
    constructor(name, ...rules) {
        this.name = name;
        this.rules = rules;
    }
    /** Add rules to a policy. */
    push(...rules) {
        this.rules.push(...rules);
        return this;
    }
    /** Check whether an action is allowed on a path.
      * @param path Path to be acted on.
      * @param verb Action to be performed.
      * @param ctx Query context for resolving context-dependent paths.
      * @returns Returns `true` if the action is explicitly allowed,
      *          `false` if the action is explicitly denied, or
      *          `null` if the combination of path and action
      *          is not governed by this policy. */
    query(path, verb, ctx) {
        let allow = null;
        for (const rule of this.rules) {
            const res = rule.query(path, verb, ctx);
            if (res === false) {
                return false;
            }
            if (res === true) {
                allow = true;
            }
        }
        return allow;
    }
    /** Check whether a path is governed by this policy.
      * @param path Path to be checked.
      * @param ctx Query context for resolving context-dependent paths. */
    matches(path, ctx) {
        for (const rule of this.rules) {
            if (rule.matches(path, ctx)) {
                return true;
            }
        }
        return false;
    }
    /** Create clone of a policy.
      * @param name Replacement name for new policy.
      * @param deep Deep copy; clone underlying rules as well. */
    clone(name = this.name, deep = true) {
        return deep
            ? new Policy(name, ...this.rules.map((rule) => rule.clone()))
            : new Policy(name, ...this.rules);
    }
    /** Static constructor function; returns a new Policy. */
    static for(name, ...rules) {
        return new Policy(name, ...rules);
    }
}
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');
describe('test _spacl_core', function() {
    it('test @spacl/core.Policy', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.