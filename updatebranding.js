const puppeteer = require('puppeteer');


	async function updateBranding(uuid, brokeragesite) {
		const browser = await puppeteer.launch({headless: false});
		const page = await browser.newPage();
		const url = `https://branding.moxiworks.com/templates/${uuid}/attrs/listing_canonical_base_url/edit`;

		  // Set the viewport size to a wider width
  		await page.setViewport({ width: 1200, height: 1000 });

		await page.goto(url);
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
  		debugger;

  		// Clear the existing text in the input field.
  		await inputField.click({ clickCount: 3 }); // Select all text
  		console.log('Click 3 successfully!');
  		debugger;



  		await inputField.press('Backspace'); // Delete the text
  		debugger;


  		// Type the new text into the input field.
  		await inputField.type(brokeragesite);
  		debugger;


  		// Click the submit button by value selector.
  		await page.$eval('input[type="submit"][name="commit"][value="Update Attr"]', button => button.click());
  		debugger;

		//await browser.close();

	};

		async function updateBrandingNoSignIn(uuid, brokeragesite) {
		const browser = await puppeteer.launch({headless: false});
		const page = await browser.newPage();
		const url = `https://branding.moxiworks.com/templates/${uuid}/attrs/listing_canonical_base_url/edit`;

		  // Set the viewport size to a wider width
  		await page.setViewport({ width: 1200, height: 1000 });

		await page.goto(url, { waitUntil: 'networkidle0' });
		debugger;
		// Locate the input field you want to replace text in.
		await page.waitForNavigation();
		debugger;
		console.log('Page loaded successfully!');
		debugger;

  		const inputField = await page.$('#attr_val');
  		 console.log('attr_val loaded successfully!');
  		debugger;

  		// Clear the existing text in the input field.
  		await inputField.click({ clickCount: 3 }); // Select all text
  		console.log('Click 3 successfully!');
  		debugger;



  		await inputField.press('Backspace'); // Delete the text
  		debugger;


  		// Type the new text into the input field.
  		await inputField.type(brokeragesite);
  		debugger;


  		// Click the submit button by value selector.
  		await page.$eval('input[type="submit"][name="commit"][value="Update Attr"]', button => button.click());
  		debugger;

		//await browser.close();

	};




	// Call function1 and then function2
(async () => {
  await	updateBranding('3272554', 'http://arielletorkildsen.agent.barrettsothebysrealty.com');
	await updateBrandingNoSignIn('3343564', 'https://cbdanforth.sites.cbmoxi.com');
})();