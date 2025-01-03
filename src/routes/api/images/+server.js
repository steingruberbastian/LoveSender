import fs from "fs";
import path from "path";

export async function GET() {
    const directoryPath = path.join(process.cwd(), "static/images/carousel");
    const files = fs.readdirSync(directoryPath);
    const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));
    const imageUrls = images.map(image => `/images/carousel/${image}`);
    return new Response(JSON.stringify(imageUrls), {
        headers: {
            "Content-Type": "application/json"
        }
    });
}