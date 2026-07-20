import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should invoke the ninvoke method correctly', () => {
        const promise = Q();
        const name = 'testMethod';
        const args = ['arg1', 'arg2'];

        const result = promise.ninvoke(name, ...args);

        expect(result).toBeInstanceOf(Q);
    });
});