import * as handlebars from "handlebars";
import * as fs from "fs";
import parser from "fast-xml-parser";

const xml = "resources/metadata.xml";
const outputFolder = "src/entityType";
const xmlData = fs.readFileSync(xml).toString();
var options = {
    attributeNamePrefix : "",
    ignoreAttributes : false,
};
const jsonData = parser.parse(xmlData, options);
const source = fs.readFileSync(`${__dirname}/EntityType.handlebars`, "utf8");
const template = handlebars.compile(source);
fs.mkdirSync(outputFolder, { recursive: true });

const schema = jsonData["edmx:Edmx"]["edmx:DataServices"].Schema
for (const item of schema.EntityType) {
    const outputFile = `${outputFolder}/${item.Name}.ts`;
    console.debug(outputFile);
    if (Array.isArray(item.Property) == false) {
        item.Property = [item.Property];
    }
    
    const sourceCode = template(item);
    fs.writeFileSync(outputFile, sourceCode);
}

