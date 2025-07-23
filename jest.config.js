// module.exports = {
//   // transform: {
//   //     "^.+\\.jsx?$": `<rootDir>/jest-preprocess.js`,
//   // },
//   transform: {
//     "^.+\\.tsx?$": "ts-jest",
//     "^.+\\.svg$": "<rootDir>/__mocks__/svgTransform.ts",
//     "^.+\\.jsx?$": "ts-jest",
//     "^.+\\.js$": "ts-jest",
//   },
//   moduleNameMapper: {
//     ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
//     ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `identity-obj-proxy`,
//     //   ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
//   },
//   testPathIgnorePatterns: [`node_modules`, `.cache`],
//   transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
//   globals: {
//     __PATH_PREFIX__: ``,
//   },
//   testURL: `http://localhost`,
//   setupFiles: [`<rootDir>/loadershim.js`],
// }

module.exports = {
  preset: "ts-jest",
  rootDir: ".",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
    __PATH_PREFIX__: ``,
    __BASE_PATH__: ``,
  },
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.ts`,
    "@/(.*)": "<rootDir>/src/$1",
  },
  setupFiles: [`<rootDir>/loadershim.js`],
  setupFilesAfterEnv: ["<rootDir>/test-setup.js"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.svg$": "<rootDir>/__mocks__/svgTransform.ts",
    "^.+\\.jsx?$": "ts-jest",
    "^.+\\.js$": "ts-jest",
  },
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
}
