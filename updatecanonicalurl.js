const puppeteer = require('puppeteer');

const company_uuids = ['3272554', '3343564', '3344353'];
const company_brokeragesites = ['http://arielletorkildsen.agent.barrettsothebysrealty.com', 'https://cbdanforth.sites.cbmoxi.com', 'https://hickokandboardman.sites.cbmoxi.com'];


	async function updateCanonicalURL(uuids, brokeragesites){
		const browser = await puppeteer.launch({headless: false});
		const page = await browser.newPage();

		// Set the viewport size to a wider width
  		await page.setViewport({ width: 1200, height: 1000 })
  		
		await page.goto('https://branding.moxiworks.com/');
		await page.type('#username', process.env.rosterusername);
		await page.click('#login-submit');

		await page.waitForSelector('#password');

		await page.type('#password', process.env.rosterpassword);
		await page.click('#login-submit');
		debugger;
		// Wait for the page to load after login


		for (let i = 0; i < uuids.length; i++) {
		    const uuid = uuids[i];
		    const brokeragesite = brokeragesites[i];

		const url = `https://branding.moxiworks.com/templates/${uuid}/attrs/listing_canonical_base_url/edit`;


		await page.goto(url);
		debugger;
		// Locate the input field you want to replace text in.
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
  		console.log(`${uuid} : ${brokeragesite}`)
  		debugger;
  	}

		await browser.close();

	};

	

	updateCanonicalURL(company_uuids, company_brokeragesites);