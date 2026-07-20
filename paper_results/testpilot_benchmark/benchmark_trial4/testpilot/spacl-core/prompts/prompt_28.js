Your task is to write a test for the following function:
```
class @spacl/core.Rule(spec)
```

This function is defined as follows:
```
class Rule {
    /** @param spec Path specification or pre-compiled matcher for
      *             determining which paths this rule will apply to. */
    constructor(spec) {
        /** Set of verbs governed by this rule; allowed verbs
          * are marked as `true`, denied verbs as `false`. */
        this.verbs = {};
        this.regex = spec instanceof matcher_1.Matcher
            ? spec
            : new matcher_1.Matcher(spec);
    }
    /** Mark one or more verbs as allowed.
      * @note Deny overrides allow within SPACL policies;
      *       this method will have no effect on verbs
      *       previously marked as denied. */
    allow(...verbs) {
        for (const verb of verbs) {
            if (!(verb in this.verbs)) {
                this.verbs[verb] = true;
            }
        }
        return this;
    }
    /** Mark one or more verbs as denied. */
    deny(...verbs) {
        for (const verb of verbs) {
            this.verbs[verb] = false;
        }
        return this;
    }
    /** Check whether an action is allowed on a path.
      * @param path Path to be acted on.
      * @param verb Action to be performed.
      * @param ctx Query context for resolving context-dependent paths.
      * @returns Returns `true` if the action is explicitly allowed,
      *          `false` if the action is explicitly denied, or
      *          `null` if the combination of path and action
      *          is not governed by this rule. */
    query(path, verb, ctx) {
        if (this.matches(path, ctx) && verb in this.verbs) {
            return this.verbs[verb];
        }
        return null;
    }
    /** Check whether a path is governed by this rule.
      * @param path Path to be checked.
      * @param ctx Query context for resolving context-dependent paths. */
    matches(path, ctx) {
        const match = path.match(this.regex);
        if (match === null) {
            return false;
        }
        const count = this.regex.props.length;
        if (count > 0) {
            if (ctx === undefined) {
                return false;
            }
            for (let index = 0; index < count; index++) {
                const prop = ctx[this.regex.props[index]];
                if (prop === undefined || match[index + 1] !== prop) {
                    return false;
                }
            }
        }
        return true;
    }
    /** Create clone of a rule.
      * @param spec Replacement path specification for the new rule. */
    clone(spec = this.regex) {
        const rule = new Rule(spec);
        for (const verb in this.verbs) {
            rule.verbs[verb] = this.verbs[verb];
        }
        return rule;
    }
    /** Static constructor function; returns a new Rule.
      * @param spec Path specification or pre-compiled matcher for
      *             determining which paths this rule will apply to. */
    static for(spec) {
        return new Rule(spec);
    }
}
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');
describe('test _spacl_core', function() {
    it('test @spacl/core.Rule', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.