import { Q } from "../../../q.js";

describe('Q', () => {
    it('Q["delete"] should be a function', () => {
        var obj = { foo: 'bar' };
        var promise = Q(obj).del('foo');
        promise.then(function() {
            expect(obj.foo).toBeUndefined();
        });
    });
});