const path = require('path');
const { urlPathFromFilePath, flattenMarkdownData } = require('./src/utils/page-utils');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    plugins: [
        {
            module: require('sourcebit-source-filesystem'),
            options: {
                watch: true,
                sources: [
                    { name: 'pages', path: path.join(__dirname, 'content/pages') },
                    { name: 'data', path: path.join(__dirname, 'content/data') }
                ]
            }
        },
        flattenMarkdownData(),
        {
            module: require('./sourcebit-angular'),
            options: {
                liveUpdate: false,
                flattenAssetUrls: true,
                pages: (objects) => {
                    const pageObjects = objects.filter((page) => page.__metadata.sourceName === 'pages');
                    const pages = pageObjects.map((page) => {
                        const { __metadata, ...restProps } = page;
                        const urlPath = urlPathFromFilePath(page.__metadata.relSourcePath);
                        return {
                            __metadata: {
                                ...__metadata,
                                urlPath,
                            },
                            ...restProps
                        };
                    });

                    return [...pages];
                }
            }
        }
    ]
};
