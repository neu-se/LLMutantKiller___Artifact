import { Q } from '../../../../../../../../subject_repositories/q/q.js';

describe('Q', () => {
    it('should set a property on an object', () => {
        var obj: any = {};
        var promise = Q(obj).set("test", "value");
        return promise.then(function () {
            expect(obj.test).toBe("value");
        });
    });
});