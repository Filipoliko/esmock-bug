import { test, mock } from 'node:test';
import assert from 'node:assert';

import esmock from 'esmock';

test('parseChangelog', async () => {
    const content = 'content';
    const parseChangelog = await esmock('changelog-parser', {}, {
        fs: { // This does not get mocked in `line-reader` module
            open: mock.fn(),
            close: mock.fn(),
            read: mock.fn(() => content),
        },
        'line-reader': { // This does not get mocked in `changelog-parser` module
            readLine: mock.fn(() => content),
        }
    });

    const changelog = await parseChangelog({
        filePath: 'fake',
    });

    assert.equal(changelog, content);
});
