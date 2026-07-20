import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty';

describe('Dirty', function () {
  it('should emit an error event when an empty line is encountered in the database file', function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);

    db.on('load', () => {
      db.on('error', (err) => {
        if (err.message === 'Empty lines never appear in a healthy database') {
          done();
        }
      });

      fs.appendFileSync(file, '\n');
    });
  });
});