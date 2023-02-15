import getCompiler from './helpers/getCompiler';
import readAsset from './helpers/readAsset';
import execute from './helpers/execute';
import compile from './helpers/compile';
import { getElement, loadDocument } from './helpers/element-is-present';

describe('loader', () => {
  it('should work', async () => {
    const compiler = getCompiler('page.njk', {
      data: {
        variable1: 'value1',
      },
    });
    const stats = await compile(compiler);
    const asset = readAsset('main.bundle.js', compiler, stats);
    await execute(asset);
    const doc = loadDocument('page.njk', compiler, stats);

    expect(getElement('p', doc).textContent.trim()).toBe('value1');
  });
});
