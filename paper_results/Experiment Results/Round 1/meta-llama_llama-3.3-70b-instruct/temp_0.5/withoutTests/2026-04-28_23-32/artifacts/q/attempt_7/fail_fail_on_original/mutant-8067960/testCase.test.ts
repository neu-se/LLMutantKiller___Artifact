import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.get', () => {
    it('should throw an error when Q.get is called with no implementation', () => {
        const object = { foo: 'bar' };
        const key = 'foo';
        expect(() => Q.get(object, key)).toThrowError();
    });
});