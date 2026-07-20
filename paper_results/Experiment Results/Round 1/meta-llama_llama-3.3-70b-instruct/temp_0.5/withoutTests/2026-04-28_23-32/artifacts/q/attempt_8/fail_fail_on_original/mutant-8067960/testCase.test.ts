import { Q } from "../../../q.js";

describe('Q.get', () => {
    it('should not throw an error when Q.get is called', () => {
        const object = { foo: 'bar' };
        const key = 'foo';
        expect(() => Q(object).get(key)).not.toThrowError();
    });
});