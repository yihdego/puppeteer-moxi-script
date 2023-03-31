const puppeteer = require('puppeteer');
require('dotenv').config();


describe('My First Puppeteer Test', () => {
	it('should launch the browser', async function() {
		const browser = await puppeteer.launch({headless: false});
		const page = await browser.newPage();

		  // Set the viewport size to a wider width
  		await page.setViewport({ width: 1200, height: 1000 });

		await page.goto('https://branding.moxiworks.com/templates/2029879/attrs/listing_canonical_base_url/edit');
		await page.type('#username', process.env.rosterusername);
		await page.click('#login-submit');

		await page.waitForSelector('#password');

		await page.type('#password', process.env.rosterpassword);
		await page.click('#login-submit');
		debugger;
		// Locate the input field you want to replace text in.
		await page.waitForNavigation();
		debugger;
		console.log('Page loaded successfully!');
		debugger;

  		const inputField = await page.$('#attr_val');
  		 console.log('attr_val loaded successfully!');

  		// Clear the existing text in the input field.
  		await inputField.click({ clickCount: 3 }); // Select all text
  		console.log('Click 3 successfully!');


  		await inputField.press('Backspace'); // Delete the text

  		// Type the new text into the input field.
  		await inputField.type('https://corcoranicon.com');

  		// Click the submit button by value selector.
  		await page.$eval('input[type="submit"][name="commit"][value="Update Attr"]', button => button.click());
		//await browser.close();
	})
}) 