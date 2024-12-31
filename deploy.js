import { publish } from 'gh-pages';
import minimist from 'minimist';

const args = minimist(process.argv.slice(2));

const today = new Date().toISOString().split('T')[0];
const message = Array.isArray(args.message) ? args.message[1] : args.message || `Update ${today}`;
const tag = Array.isArray(args.tag) ? args.tag[1] : args.tag;

const options = tag ? { message: message, tag: tag } : { message: message };
console.log('Deploying with options:', options);

publish('dist', options, (err) => {
    if (err) {
        console.error('Error during publish:', err);
    } else {
        console.log('Published to GitHub Pages');
    }
});