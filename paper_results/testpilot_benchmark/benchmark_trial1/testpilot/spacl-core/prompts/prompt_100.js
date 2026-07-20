Your task is to write a test for the following function:
```
class @spacl/core.PolicyMap(...policies)
```

This function is defined as follows:
```
class PolicyMap extends Map {
    constructor(...policies) {
        super(policies.map((policy) => [policy.name, policy]));
    }
    /** Add policies to colllection. */
    push(...policies) {
        for (const policy of policies) {
            this.set(policy.name, policy);
        }
        return this;
    }
    /** Check whether an action is allowed on a path.
      * @param name Policy to be queried.
      * @param path Path to be acted on.
      * @param verb Action to be performed.
      * @param ctx Query context for resolving context-dependent paths.
      * @returns Returns `true` if the action is explicitly allowed,
      *          `false` if the action is explicitly denied, or
      *          `null` if the combination of policy, path and
      *          action is not governed by this collection. */
    query(name, path, verb, ctx) {
        const policy = this.get(name);
        return policy !== undefined
            ? policy.query(path, verb, ctx)
            : null;
    }
    /** Check whether a path is governed by a policy in this collection.
      * @param name Policy to be queried.
      * @param path Path to be checked.
      * @param ctx Query context for resolving context-dependent paths. */
    matches(name, path, ctx) {
        const policy = this.get(name);
        return policy !== undefined
            ? policy.matches(path, ctx)
            : false;
    }
    /** Static constructor function; returns a new PolicyMap. */
    static for(...policies) {
        return new PolicyMap(...policies);
    }
}
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');
describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.