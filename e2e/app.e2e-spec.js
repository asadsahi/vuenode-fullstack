import { BASE_URL } from './environment';
import { Selector } from 'testcafe';

fixture('App').page(BASE_URL);

test('should have correct heading on home page', async t => {
  // Must use promises (async / await  here) for communication with the browser.
  const h1 = await new Selector('body div.container h1');

  // Assert that the inner text of the paragraph is "Hello World!"
  await t.expect(h1.innerText).eql('VueNode');
});
