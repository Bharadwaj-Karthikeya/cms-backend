import cron from 'node-cron';
import artifact from '../models/artifact.js';


export const testing = () => {
    console.log('Running a task every 12 hours');

    cron.schedule('0 */12 * * *', () => {
        artifact.find({
            status: "draft", 
            createdAt: { $lte: new Date(Date.now() - 1*24*60*60*1000)}
        })
        .then(artifacts => {
            console.log(`Found ${artifacts.length} draft artifacts older than 1 day.`);
            console.log(`Setting them to archived`)

            artifacts.forEach(artifact => {
                artifact.status = "archived";
                artifact.save();
            }
            );
        })
    });
}