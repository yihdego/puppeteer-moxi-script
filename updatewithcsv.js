const puppeteer = require('puppeteer');
const fs = require('fs');
const csv = require('csv-parser');

const company_uuids = [];
const company_brokeragesites = [];

fs.createReadStream('report-only-new-values.csv')
  .pipe(csv({ mapHeaders: ({ header }) => header.replace(/^\ufeff/, '') })) // remove BOM character
  .on('data', (row) => {
  	console.log(row);
    // Get the data from each row
    const uuid = row['company_uuid'];
    const brokeragesite = row['new_listing_base_value'];

    // Push the values into the arrays
    console.log(uuid)
    console.log(brokeragesite)
    company_uuids.push(uuid);
    company_brokeragesites.push(brokeragesite);
	})
  .on('end', () => {
    console.log(company_uuids);
    console.log(company_brokeragesites);
  });


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
		console.log('sign in successful')
		// Wait for the page to load after login


		for (let i = 0; i < uuids.length; i++) {
		    const uuid = uuids[i];
		    const brokeragesite = brokeragesites[i];

		const url = `https://branding.moxiworks.com/templates/${uuid}/attrs/listing_canonical_base_url/edit`;
		console.log(url)

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