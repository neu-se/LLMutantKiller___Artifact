import { Q } from '../../../q';

describe('Q', () => {
    it('should set a property on an object', () => {
        var obj: any = {};
        return Q.fcall(function () {
            Q(obj).set("test", "value");
            expect(obj.test).toBe("value");
        });
    });
});