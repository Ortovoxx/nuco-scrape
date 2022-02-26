const axios = require('axios');
const FormData = require('form-data');
const { writeFileSync } = require('fs');

const { cookie, accommodationCode } = require('./config');
const checkRoom = require('./room');

(async () => {
    const data = new FormData();
    data.append('type', 'allocblock');
    data.append('id', accommodationCode);

    const res = await axios({
        method: 'post',
        url: 'https://api.nucotravel.com/api/query',
        headers: {
            'Cookie': cookie,
            ...data.getHeaders(),
        },
        data: data
    }).catch(console.error)

    if (!res) return;

    const accommodation = res.data.querydata[accommodationCode]

    console.log(`Accomodation name: ${accommodation.shorttext}`);
    console.log(`Number of rooms: ${Object.entries(accommodation.children).length}`);
    console.log(`Room sizes: ${Object.entries(accommodation.children).map(([key, value]) => {
        return value.allocplaces[0].capacity
    })}`);

    let people = [];

    for (const [key, value] of Object.entries(accommodation.children)) {

        console.log(`Fetching data about room ${value.id} with ${value.allocplaces[0].availability}/${value.allocplaces[0].capacity} places`);

        const room = await checkRoom(key)

        const members = Object.values(room.members[0]).map(m => ({ ...m, room: value.id }));
        console.log(`Found ${members.length} people: ${Object.keys(room.members[0])}`);
        people = [...people, ...members]

        await new Promise(resolve => setTimeout(resolve, 2000)); // Waits 2 seconds to prevent rate limit errors
    };

    let peopleCSV = "Id,Name,Gender,Facebook Id,Room";

    for (const person of people) {
        peopleCSV += (
            '\n' + [
                person.id,
                person.displayname,
                person.details.gender,
                person.details.facebookid,
                person.room
            ]
        )
    }

    writeFileSync('./people.csv', peopleCSV)
})()