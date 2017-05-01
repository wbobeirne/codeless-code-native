const cheerioReq = require("cheerio-req");
const fs = require("fs");

cheerioReq("http://thecodelesscode.com/topics", (err, $) => {
	if (err) {
		console.error(err);
		console.error("Experienced error while scraping topics. Exiting.");
		process.exit(1);
	}

	console.log("Processing topics HTML...");

	const topicsMap = {};
	const dest = "content/topics.json";
	const $topicsRows = $(".toc-dt tr");
	const topicsCount = $topicsRows.length;

	// For every row in the topics table, add a topic to the map
	$topicsRows.each((idx, el) => {
		process.stdout.write(`Processing topic ${idx + 1} of ${topicsCount}\r`);

		const $el = $(el);
		const cases = [];
		const name = $el.find(".toc-tag-head a").text();

		if (name) {
			$el.find(".toc-caselist .ccn").each((idx, caseEl) => {
				cases.push($(caseEl).text());
			});

			topicsMap[name] = cases;
		}
	});

	console.log(`Writing ${topicsCount} topics json to ${dest}...`);
	fs.writeFileSync(dest, JSON.stringify(topicsMap, null, 2), "utf-8");
});
