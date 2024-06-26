var  { TibberFeed, TibberQuery, TibberQueryBase, IConfig } =  require("tibber-api")
const dotenv = require('dotenv');
dotenv.config();

const TOKEN = process.env.TOKEN;
const HOME_ID = process.env.HOME_ID;
const GOOGLE_FORM_URL = process.env.GOOGLE_FORM_URL;
const GOOGLE_FROM_ENTRY_LAST_METER_CONSUMPTION = process.env.GOOGLE_FROM_ENTRY_LAST_METER_CONSUMPTION;
const GOOGLE_FROM_ENTRY_LAST_METER_PRODUCTION = process.env.GOOGLE_FROM_ENTRY_LAST_METER_PRODUCTION;

if (!(TOKEN && HOME_ID && GOOGLE_FORM_URL && GOOGLE_FROM_ENTRY_LAST_METER_CONSUMPTION && GOOGLE_FROM_ENTRY_LAST_METER_PRODUCTION)) {
    console.error("Missing configuration!");
    console.error("TOKEN", TOKEN);
    console.error("HOME_ID", HOME_ID);
    console.error("GOOGLE_FORM_URL", GOOGLE_FORM_URL);
    console.error("GOOGLE_FROM_ENTRY_LAST_METER_CONSUMPTION", GOOGLE_FROM_ENTRY_LAST_METER_CONSUMPTION);
    console.error("GOOGLE_FROM_ENTRY_LAST_METER_PRODUCTION", GOOGLE_FROM_ENTRY_LAST_METER_PRODUCTION);
    return;
}

// Config object needed when instantiating TibberQuery
const config = {
    // Endpoint configuration.
    apiEndpoint: {
        apiKey: `${TOKEN}`, // Demo token
        queryUrl: 'https://api.tibber.com/v1-beta/gql',
        //requestTimeout: 5000,
    },
    // Query configuration.
    homeId: `${HOME_ID}`,
    timestamp: true,
    power: true,
    active: true,
    lastMeterConsumption: true,
    lastMeterProduction: true,
};

async function run() {

    // Instantiate TibberFeed.
    const tibberQuery = new TibberQuery(config);
    const tibberFeed = new TibberFeed(tibberQuery, 1000, false, 1000);

    // Subscribe to "data" event.
    let firstSend = false;
    tibberFeed.on('data', (data) => {
        console.log(data);
        if (!firstSend) {
            firstSend = true;
            submitForm(data);
        }   
    });

    // Connect to Tibber data feed
    tibberFeed.connect();

    setTimeout(() => {
        // set retry after 2 minutes
        firstSend = false;
      }, "" + (2*60*1000));

      setTimeout(() => {
        // kill after after 5 minutes
        process.exit();
      }, "" + (5*60*1000));

}
async function submitForm(data) {
    try {
        const params = new URLSearchParams();
        params.append(`${GOOGLE_FROM_ENTRY_LAST_METER_CONSUMPTION}`, data.lastMeterConsumption);
        params.append(`${GOOGLE_FROM_ENTRY_LAST_METER_PRODUCTION}`, data.lastMeterProduction);

        const post = await fetch(`${GOOGLE_FORM_URL}`, {method: 'POST', body: params});
        const text = await post.text();
        console.log("post.status", post.status);
        process.exit();
    } catch (err) {
        console.log(err.message); //can be console.error
    }
}

(async() => {
    run();
})()