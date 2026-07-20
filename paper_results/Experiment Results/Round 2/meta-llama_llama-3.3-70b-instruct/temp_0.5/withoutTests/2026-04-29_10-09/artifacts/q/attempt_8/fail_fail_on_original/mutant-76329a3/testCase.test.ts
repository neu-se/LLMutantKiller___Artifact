import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.fbind', () => {
    it('should throw an error when the bound function is called without arguments on the mutated code', () => {
        const obj = {
            foo: 'bar',
            method: function(arg1, arg2) {
                return this.foo + arg1 + arg2;
            }
        };

        const boundMethod = Q.fbind(obj.method, obj);
        expect(() => boundMethod()).toThrowError();
    });
});