const fs = require("fs");
const $ = require("cheerio");
const cases = require("../content/cases.json");
const caseIds = Object.keys(cases).sort();

caseIds.forEach((id) => {
	process.stdout.write(`Processing case HTML ${id} of ${caseIds.length}\r`);

	const html = fs.readFileSync(`content/html/cases/${id}.html`).toString();
	const $case = $.load(html);
	const blocks = $case(".story").children();
	let markdown = "";

	for (var i = 0; i < blocks.length; i++) {
		const block = blocks[i];
		let valid = true;
		let prepend = "";
		let append = "";
		let contents = $(block).text();

		switch(block.name) {
			case "p":
				// Nothing, a p's a p
				break;

			case "img":
				if (block.attribs.src.indexOf("hrule") !== -1) {
					contents = "----------";
				}
				else {
					contents = block.attribs.src;
					prepend = "![](";
					append = ")";
				}
				break;

			case "blockquote":
				prepend = "> ";
				break;

			case "pre":
				prepend = "    ";
				break;

			case "h1":
				prepend = "# ";
				break;

			case "h2":
				prepend = "## ";
				break;

			case "h3":
				prepend = "### ";
				break;

			default:
				valid = false
		}

		if (valid) {
			if (markdown.length) {
				markdown += "\n\n";
			}
			markdown += prepend;
			markdown += contents;
			markdown += append;
		}
	}

	markdown += "\n";
	fs.writeFileSync(`content/cases/${id}.md`, markdown, "utf-8");
});
