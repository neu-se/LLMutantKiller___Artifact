import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.fbind', () => {
    it('should return undefined when the bound function is called on the mutated code', () => {
        const obj = {
            foo: 'bar',
            method: function() {
                return this.foo;
            }
        };

        const boundMethod = Q.fbind(obj.method, obj);
        const result = boundMethod();
        expect(result).toBeUndefined();
    });
});