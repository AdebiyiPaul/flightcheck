import {LOGGER} from "./Methods";

// LIVE BASE URL
const baseUrl = 'https://api.lufthansa.com/v1/';

export const FETCH_AIRPORT_API = 'mds-references/airports';
export const FETCH_AIRPORT_SCHEDULE_API = 'operations/schedules';

export const SERVER_REQUEST = async (body, endpoint, reqType) => {
    let response;
    const _headers = await GET_HEADER();
    const url = `${baseUrl}${endpoint}`;

    const FETCH_TIMEOUT = 120000;
    let didTimeOut = false;

    return new Promise(async (resolve, reject) => {
        const timeout = setTimeout(function() {
            didTimeOut = true;
            reject(new Error('Request timed out'));
        }, FETCH_TIMEOUT);

        if (reqType.toLowerCase() === 'get') {
            response = await fetch(url, {
                method: reqType.toUpperCase(),
                headers: _headers
            });
        } else {
            LOGGER('JSON Stringify', JSON.stringify(body))
            response = await fetch(url, {
                method: reqType.toUpperCase(),
                headers: _headers,
                body: JSON.stringify(body)
            });
        }

        clearTimeout(timeout);
        if(!didTimeOut) {
            console.log(response);
            const res = await response.json();

            resolve(res);
        }
    });
};

const GET_HEADER = async () => {
    return new Headers({
        'Content-Type': 'application/json',
        Authorization: 'Bearer 5eyrt26jku6h98p46p5tej5g'
    });
};
