const cheerioReq = require("cheerio-req");
const fs = require("fs");

const places = [
	"Plain",
	"Abbey",
	"Temple",
	"Road",
	"Hall",
	"Hermitage",
	"Province",
	"Bridge",
	"Tower",
];
const placesRx = new RegExp(places.join("|"));

cheerioReq("http://thecodelesscode.com/names", (err, $) => {
	if (err) {
		console.error(err);
		console.error("Experienced error while scraping names. Exiting.");
		process.exit(1);
	}

	console.log("Processing names HTML...");

	const namesMap = {};
	const dest = "content/names.json";
	const $namesRows = $(".toc-dt tr");
	const namesCount = $namesRows.length;

	// For every row in the names table, add a name to the map
	$namesRows.each((idx, el) => {
		process.stdout.write(`Processing name ${idx + 1} of ${namesCount}\r`);

		const $el = $(el);
		const cases = [];
		const name = $el.find(".toc-tag-head a").text();

		if (name) {
			$el.find(".toc-caselist .ccn").each((idx, caseEl) => {
				cases.push($(caseEl).text());
			});

			// Determine the type of name
			let type;
			if (name.indexOf("Clan") !== -1) {
				type = "clan";
			}
			else if (placesRx.test(name)) {
				type = "place";
			}
			else {
				type = "person";
			}

			namesMap[name] = {
				name,
				type,
				cases,
			};
		}
	});

	console.log(`Writing ${namesCount} names json to ${dest}...`);
	fs.writeFileSync(dest, JSON.stringify(namesMap, null, 2), "utf-8");
});
