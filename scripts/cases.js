const cheerioReq = require("cheerio-req");
const fs = require("fs");

cheerioReq("http://thecodelesscode.com/contents", (err, $) => {
	if (err) {
		console.error(err);
		console.error("Experienced an error while scraping cases. Exiting.");
		process.exit(1);
	}

	console.log("Processing cases HTML...");

	const casesMap = {};
	const dest = "content/cases.json";
	const $casesRows = $(".toc-dt tr");
	const casesCount = $casesRows.length;
	let highestCase = 1;

	// For every row in the cases table, add a case to the list
	$casesRows.each((idx, el) => {
		process.stdout.write(`Processing case ${idx + 1} of ${casesCount}\r`);

		const $el = $(el);
		const cases = [];
		const name = $el.find(".toc-name a").text();

		if (name) {
			const id = parseInt($el.find(".toc-num").text(), 10);
			const geekiness = parseInt($el.find(".toc-geek span").first().text(), 10);
			const date = $el.find(".toc-date").text();

			casesMap[id] = { id, name, geekiness, date };
			highestCase = Math.max(id, highestCase);
		}
	});

	console.log(`Writing ${casesCount} cases json to ${dest}...`);
	fs.writeFileSync(dest, JSON.stringify(casesMap, null, 2), "utf-8");


	function reqAndSaveCaseRecursively(id) {
		cheerioReq(`http://thecodelesscode.com/case/${id}`, (caseErr, $casePage) => {
			if (caseErr) {
				console.error(caseErr);
				console.error(`Experienced an error while scraping case #${id}. Exiting.`);
				process.exit(1);
			}

			process.stdout.write(`Saving case ${id} of ${casesCount}\r`);
			fs.writeFileSync(`content/html/cases/${id}.html`, $casePage("#contenttext").html(), "utf-8");

			// And snag the next one
			if (id < highestCase) {
				reqAndSaveCaseRecursively(id + 1);
			}
			else {
				console.log("All done!");
				process.exit(0);
			}
		});
	}

	console.log("Retrieving each case's HTML...");
	reqAndSaveCaseRecursively(1);
});
