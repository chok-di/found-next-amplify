// import fs from 'fs';
// import path from 'path';
// import matter from 'gray-matter';


// import { remark } from 'remark';
// import html from 'remark-html';

// const tripsDirectory = path.join(process.cwd(), 'trips');

// export function getSortedTripssData() {
//   // Get file names under /trips
//   const fileNames = fs.readdirSync(tripsDirectory);
//   const allTripsData = fileNames.map((fileName) => {
//     // Remove ".md" from file name to get id
//     const id = fileName.replace(/\.md$/, '');

//     // Read markdown file as string
//     const fullPath = path.join(postsDirectory, fileName);
//     const fileContents = fs.readFileSync(fullPath, 'utf8');

//     // Use gray-matter to parse the post metadata section
//     const matterResult = matter(fileContents);

//     // Combine the data with the id
//     return {
//       id,
//       ...matterResult.data as {date: string; title: string},
//     };
//   });
//   // Sort posts by date
//   return allTripsData.sort((a, b) => {
//     if (a.date < b.date) {
//       return 1;
//     } else {
//       return -1;
//     }
//   });
// }

// export function getAllTripIds() {
//   const fileNames = fs.readdirSync(tripsDirectory);
//   return fileNames.map((fileName) => {
//     return {
//       params: {
//         id: fileName.replace(/\.md$/, ''),
//       },
//     };
//   });
// }

// export async function getTripData(id: string) {
//   const fullPath = path.join(tripsDirectory, `${id}.md`);
//   const fileContents = fs.readFileSync(fullPath, 'utf8');

//   // Use gray-matter to parse the post metadata section
//   const matterResult = matter(fileContents);

//   const processedContent = await remark()
//     .use(html)
//     .process(matterResult.content);
//   const contentHtml = processedContent.toString();

//   // Combine the data with the id
//   return {
//     id,
//     contentHtml,
//     ...matterResult.data as {date: string; title: string},
//   };
// }