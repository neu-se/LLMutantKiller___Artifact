import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q post method', function () {
    it('should return a promise', function () {
        var obj = {
            myMethod: function(name, args) {
                return name + ' ' + args.join(' ');
            }
        };

        var result = Q.post(obj, 'myMethod', ['Hello', 'World']);
        expect(result).toBeInstanceOf(Promise);
    });
});