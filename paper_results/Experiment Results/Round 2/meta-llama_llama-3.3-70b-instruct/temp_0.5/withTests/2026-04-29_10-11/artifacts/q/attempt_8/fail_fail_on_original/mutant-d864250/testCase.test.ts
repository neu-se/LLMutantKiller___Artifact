import { Q } from './q.js';

describe('Q', () => {
    it('should set a property on an object', () => {
        var obj: any = {};
        return Q.fcall(function () {
            Q(obj).set("test", "value");
            expect(obj.test).toBeUndefined();
        });
    });
});